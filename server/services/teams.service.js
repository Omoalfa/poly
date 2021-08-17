const db = require('../models');
const { sequelize } = require('../models');
const projectTeams = db.tx_project_teams;
const teamProjects = db.tx_team_projects;


/**
 * Query for teamData
 * @returns {Promise<QueryResult>}
 */
const getAllTeams = () => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT team.id,team.name,team.description,
            (SELECT COUNT(member_id) FROM tx_team_members WHERE team_id = team.id) AS total_member,
            (SELECT COUNT(project_id) FROM tx_team_projects WHERE team_id = team.id) AS total_project
          FROM tx_project_teams AS team
          GROUP BY team.id`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(teamData => {
        resolve(teamData)
      })
      .catch(error => {
        reject(error)
      });
  });
};

/**
 * Query for teamData
 * @returns {Promise<QueryResult>}
 */
const getTeams = (Id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT team.id,team.name,team.description,
            (SELECT COUNT(member_id) FROM tx_team_members WHERE team_id = team.id) AS total_member,
            (SELECT COUNT(project_id) FROM tx_team_projects WHERE team_id = team.id) AS total_project
          FROM tx_project_teams AS team
          LEFT JOIN tx_team_members AS member ON team.id =  member.team_id
          WHERE member.member_id = ${Id}
          GROUP BY team.id`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(teamData => {
        resolve(teamData)
      })
      .catch(error => {
        reject(error)
      });
  });
};

/**
 * Query for teamData
 * @returns {Promise<QueryResult>}
 */
const getTeamById = (id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT team.id,team.name,team.description 
            FROM tx_project_teams AS team
          WHERE team.id = ${id}`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(teamData => {
        resolve(teamData)
      })
      .catch(error => {
        reject(error)
      });
  });
};

/**
 * @param {object} createTeam
 * @return Success : teamData object
 * @return Error : DB error
 */
const createTeam = async (createTeam) => {
  return new Promise((resolve, reject) => {
    const {
      teamName,
      description,
      userId
    } = createTeam

    projectTeams.create({
      name: teamName,
      description: description,
      created_at: Date.now(),
      created_by: userId
    }, { raw: true })
      .then((teamData) => {
        resolve(teamData)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * @param {object} teamProjectData
 * @return Success : teamData object
 * @return Error : DB error
 */
const createProjectTeam = async (teamProjectData) => {
  return new Promise((resolve, reject) => {
    const {
      teamId,
      projectId,
      userId
    } = teamProjectData

    teamProjects.create({
      team_id: teamId,
      project_id: projectId,
      created_at: Date.now(),
      created_by: userId
    }, { raw: true })
      .then((teamData) => {
        resolve(teamData)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * @param {object} Data
 * @param {filter} filter
 * @return Success : { result: [1] }
 * @return Error : DB error
 */
const updateTeam = async (Data, filter) => {
  return new Promise((resolve, reject) => {
    projectTeams.update(Data, filter)
      .then((teamData) => {
        resolve(teamData)
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
const deleteTeam = async (Id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `DELETE team,team_member,team_project,project,project_member,project_task,task_member,sub_task,task_note,project_file,activities
          FROM tx_project_teams AS team
            LEFT JOIN tx_team_members AS team_member ON team.id = team_member.team_id
            LEFT JOIN tx_team_projects AS team_project ON team.id = team_project.team_id
            LEFT JOIN tx_projects AS project ON team_project.project_id = project.id
            LEFT JOIN tx_project_members AS project_member ON project_member.project_id = project.id
            LEFT JOIN tx_project_tasks AS project_task ON project_task.project_id = project.id
            LEFT JOIN tx_task_members AS task_member ON task_member.task_id = project_task.id
            LEFT JOIN tx_sub_task AS sub_task ON sub_task.task_id = project_task.id
            LEFT JOIN tx_task_notes AS task_note ON task_note.task_id = project_task.id
            LEFT JOIN tx_project_files AS project_file ON project_file.project_id = project.id
            LEFT JOIN tx_project_activities AS activities ON activities.project_id = project.id
          WHERE team.id = ${Id};`,
        { type: sequelize.QueryTypes.DELETE }
      )
      .then(teamData => {
        resolve(teamData)
      })
      .catch(error => {
        reject(error)
      });
  });
}

module.exports = {
  getAllTeams,
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
  createProjectTeam
};


