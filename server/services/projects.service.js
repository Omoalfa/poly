const db = require('../models');
const config = require('../config/config');
const { sequelize } = require('../models');
const projects = db.tx_projects;

/**
 * Query for projectData
 * @returns {Promise<QueryResult>}
 */
const getProjects = (id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT project.id,project.name,project.visibility,project.description,
              CASE 
                WHEN project.start_date <= CURRENT_DATE() THEN (SELECT DATEDIFF(project.end_date,CURRENT_DATE()))
                ELSE (SELECT DATEDIFF(project.end_date,project.start_date))
              END AS due_day,
              (SELECT COUNT(task.id) FROM tx_project_tasks AS task WHERE task.project_id = project.id AND task.status !='Archive') AS total_task,
              (SELECT COUNT(task.id) FROM tx_project_tasks AS task WHERE task.project_id = project.id AND task.status = 'Done') AS total_done_task,
              ROUND(((SELECT COUNT(task.id) FROM tx_project_tasks AS task WHERE task.project_id = project.id AND task.status = 'Done') * 100/(SELECT COUNT(task.id) FROM tx_project_tasks AS task WHERE task.project_id = project.id AND task.status !='Archive'))) AS task_percentage
          FROM tx_projects AS project
            INNER JOIN tx_team_projects AS teamProject ON project.id = teamProject.project_id
          WHERE teamProject.team_id = ${id}`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(projectData => {
        resolve(projectData)
      })
      .catch(error => {
        reject(error)
      });
  });
};


/**
 * Query for projectData
 * @returns {Promise<QueryResult>}
 */
const getProjectsByTeamId = (id, userId) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT project.id,project.name,project.visibility,project.description,
            CASE 
              WHEN project.start_date <= CURRENT_DATE() THEN (SELECT DATEDIFF(project.end_date,CURRENT_DATE()))
              ELSE (SELECT DATEDIFF(project.end_date,project.start_date))
            END AS due_day,
            (SELECT COUNT(task.id) FROM tx_project_tasks AS task WHERE task.project_id = project.id AND task.status !='Archive') AS total_task,
            (SELECT COUNT(task.id) FROM tx_project_tasks AS task WHERE task.project_id = project.id AND task.status = 'Done') AS total_done_task,
            ROUND(((SELECT COUNT(task.id) FROM tx_project_tasks AS task WHERE task.project_id = project.id AND task.status = 'Done') * 100/(SELECT COUNT(task.id) FROM tx_project_tasks AS task WHERE task.project_id = project.id AND task.status !='Archive'))) AS task_percentage
        FROM tx_projects AS project
            INNER JOIN tx_team_projects AS teamProject ON project.id = teamProject.project_id 
            LEFT JOIN  tx_project_members AS member ON project.id = member.project_id
        WHERE teamProject.team_id = ${id}  AND member.member_id = ${userId}`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(projectData => {
        resolve(projectData)
      })
      .catch(error => {
        reject(error)
      });
  });
};

/**
 * Query for projectData
 * @returns {Promise<QueryResult>}
 */
const getProjectById = (id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT project.id,project.name,project.visibility,project.description,start_date,end_date,
            CASE 
              WHEN project.start_date <= CURRENT_DATE() THEN (SELECT DATEDIFF(project.end_date,CURRENT_DATE()))
              ELSE (SELECT DATEDIFF(project.end_date,project.start_date))
            END AS due_day,
            (SELECT COUNT(task.id) FROM tx_project_tasks AS task WHERE task.project_id = project.id AND task.status !='Archive') AS total_task,
            (SELECT COUNT(task.id) FROM tx_project_tasks AS task WHERE task.project_id = project.id AND task.status = 'Done') AS total_done_task,
            ROUND(((SELECT COUNT(task.id) FROM tx_project_tasks AS task WHERE task.project_id = project.id AND task.status = 'Done') * 100/(SELECT COUNT(task.id) FROM tx_project_tasks AS task WHERE task.project_id = project.id AND task.status !='Archive'))) AS task_percentage
        FROM tx_projects AS project 
        WHERE project.id = ${id}`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(projectData => {
        resolve(projectData)
      })
      .catch(error => {
        reject(error)
      });
  });
};


/**
 * @param {object} createProject
 * @return Success : projectData object
 * @return Error : DB error
 */
const createProject = async (createProject) => {
  return new Promise((resolve, reject) => {
    const {
      projectName,
      description,
      startDate,
      endDate,
      visibility,
      userId
    } = createProject

    projects.create({
      name: projectName,
      description: description,
      start_date: startDate,
      end_date: endDate,
      visibility: visibility,
      created_at: Date.now(),
      created_by: userId
    }, { raw: true })
      .then((projectData) => {
        resolve(projectData)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * @param {object} projectData
 * @param {filter} filter
 * @return Success : { result: [1] }
 * @return Error : DB error
 */
const updateProject = async (Data, filter) => {
  return new Promise((resolve, reject) => {
    projects.update(Data, filter)
      .then((projectData) => {
        resolve(projectData)
      }).catch((error) => {
        reject(error);
      });
  });
}

/**
 * @param {Number} Id
 * @return Success : [result:1]
 * @return Error : DB error
 */
const deleteProject = async (Id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `DELETE team_project,project,project_member,project_task,task_member,sub_task,task_note,project_file,activities
            FROM tx_projects AS project
              LEFT JOIN tx_team_projects AS team_project ON team_project.project_id = project.id
              LEFT JOIN tx_project_members AS project_member ON project_member.project_id = project.id
              LEFT JOIN tx_project_tasks AS project_task ON project_task.project_id = project.id
              LEFT JOIN tx_task_members AS task_member ON task_member.task_id = project_task.id
              LEFT JOIN tx_sub_task AS sub_task ON sub_task.task_id = project_task.id
              LEFT JOIN tx_task_notes AS task_note ON task_note.task_id = project_task.id
              LEFT JOIN tx_project_files AS project_file ON project_file.project_id = project.id
              LEFT JOIN tx_project_activities AS activities ON activities.project_id = project.id
            WHERE project.id = '${Id}' `,
        { type: sequelize.QueryTypes.DELETE }
      )
      .then(projectData => {
        resolve(projectData)
      })
      .catch(error => {
        reject(error)
      });
  });
}

module.exports = {
  getProjects,
  getProjectById,
  getProjectsByTeamId,
  createProject,
  updateProject,
  deleteProject
};


