const db = require('../models');
const { sequelize } = require('../models');
const projectTasks = db.tx_project_tasks;
const taskTypes = db.tx_task_types;

/**
 * Query for taskTypeData
 * @returns {Promise<QueryResult>}
 */
const getTaskTypes = () => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT id,name,status FROM tx_task_types WHERE status IS NULL ORDER BY id ASC`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(taskTypeData => {
        resolve(taskTypeData)
      })
      .catch(error => {
        reject(error)
      });
  });
};

/**
 * Query for taskTypeData
 * @returns {Promise<QueryResult>}
 */
const getTaskTypesById = (Id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT id,name,status FROM tx_task_types WHERE id = ${Id}`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(taskTypeData => {
        resolve(taskTypeData)
      })
      .catch(error => {
        reject(error)
      });
  });
};

/**
 * Query for taskData
 * @returns {Promise<QueryResult>}
 */
const getTaskByProjectId = (id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT ta.id,ta.name,ta.description,ta.status,
              CASE 
                WHEN ta.start_date <= CURRENT_DATE() THEN (SELECT DATEDIFF(ta.end_date,CURRENT_DATE()))
                ELSE (SELECT DATEDIFF(ta.end_date,ta.start_date))
              END AS due_day,
              (SELECT COUNT(task.id) FROM tx_sub_task AS task WHERE task.task_id = ta.id) AS total_task,
              (SELECT COUNT(task.id) FROM tx_sub_task AS task WHERE task.task_id = ta.id AND task.status = 'Done') AS total_done_task,
              ROUND(((SELECT COUNT(task.id) FROM tx_sub_task AS task WHERE task.task_id = ta.id AND task.status = 'Done') * 100/(SELECT COUNT(task.id) FROM tx_sub_task AS task WHERE task.task_id = ta.id))) AS task_percentage,
            project_id,task_type.id as typeID
          FROM tx_project_tasks AS ta
            INNER JOIN tx_task_types AS task_type ON ta.task_type_id = task_type.id
          WHERE ta.status != 'Archive' AND ta.project_id = ${id} AND task_type.status IS NULL ORDER BY task_type.id ASC
        `,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(taskData => {
        resolve(taskData)
      })
      .catch(error => {
        reject(error)
      });
  });
};

/**
 * Query for taskData
 * @returns {Promise<QueryResult>}
 */
const getTaskById = (id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT ta.id,ta.name,ta.description,ta.status,start_date,end_date,
            CASE 
              WHEN ta.start_date <= CURRENT_DATE() THEN (SELECT DATEDIFF(ta.end_date,CURRENT_DATE()))
              ELSE (SELECT DATEDIFF(ta.end_date,ta.start_date))
            END AS due_day,
            (SELECT COUNT(task.id) FROM tx_sub_task AS task WHERE task.task_id = ta.id) AS total_task,
            (SELECT COUNT(task.id) FROM tx_sub_task AS task WHERE task.task_id = ta.id AND task.status = 'Done') AS total_done_task,
            ROUND(((SELECT COUNT(task.id) FROM tx_sub_task AS task WHERE task.task_id = ta.id AND task.status = 'Done') * 100/(SELECT COUNT(task.id) FROM tx_sub_task AS task WHERE task.task_id = ta.id))) AS task_percentage,
            project_id,task_type.id as typeID
          FROM tx_project_tasks AS ta
            INNER JOIN tx_task_types AS task_type ON ta.task_type_id = task_type.id
          WHERE ta.status != 'Archive' AND ta.id = ${id} AND task_type.status IS NULL ORDER BY task_type.id ASC`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(taskData => {
        resolve(taskData)
      })
      .catch(error => {
        reject(error)
      });
  });
};

/**
 * @param {object} createTask
 * @return Success : taskData object
 * @return Error : DB error
 */
const createTask = async (createTask) => {
  return new Promise((resolve, reject) => {
    const {
      taskName,
      description,
      startDate,
      endDate,
      status,
      projectId,
      taskTypeId,
      userId
    } = createTask

    projectTasks.create({
      name: taskName,
      description: description,
      start_date: startDate,
      end_date: endDate,
      project_id: projectId,
      status: status,
      task_type_id: taskTypeId,
      created_at: Date.now(),
      created_by: userId
    }, { raw: true })
      .then((taskData) => {
        resolve(taskData)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * @param {object} taskData
 * @param {filter} filter
 * @return Success : { result: [1] }
 * @return Error : DB error
 */
const updateTask = async (Data, filter) => {
  return new Promise((resolve, reject) => {
    projectTasks.update(Data, filter)
      .then((taskData) => {
        resolve(taskData)
      }).catch((error) => {
        reject(error);
      });
  });
}

/**
 * @param {object} Data
 * @param {filter} filter
 * @return Success : { result: [1] }
 * @return Error : DB error
 */
const updateTaskStatus = async (Data, filter) => {
  return new Promise((resolve, reject) => {
    projectTasks.update(Data, filter)
      .then((taskData) => {
        resolve(taskData)
      }).catch((error) => {
        reject(error);
      });
  });
}

/**
 * @param {object} Data
 * @param {filter} filter
 * @return Success : { result: [1] }
 * @return Error : DB error
 */
const updateTaskByStatus = async (Data) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `UPDATE tx_project_tasks SET status = '${Data.status}' WHERE status = '${Data.previousName}';`,
        { type: sequelize.QueryTypes.UPDATE }
      )
      .then(taskData => {
        resolve(taskData)
      })
      .catch(error => {
        reject(error)
      });
  });
}

/**
 * @param {object} Data
 * @param {filter} filter
 * @return Success : { result: [1] }
 * @return Error : DB error
 */
const archiveTaskStatus = async (Data) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `UPDATE tx_project_tasks SET status = '${Data.status}' WHERE task_type_id = '${Data.id}';`,
        { type: sequelize.QueryTypes.UPDATE }
      )
      .then(taskData => {
        resolve(taskData)
      })
      .catch(error => {
        reject(error)
      });
  });
}



/**
 * @param {object} Data
 * @param {filter} filter
 * @return Success : { result: [1] }
 * @return Error : DB error
 */
const archiveTask = async (data, filter) => {
  return new Promise((resolve, reject) => {
    taskTypes.update(data, filter)
      .then((taskData) => {
        resolve(taskData)
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
const deleteTask = async (Id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `DELETE project_task,task_member,sub_task,task_note,project_file,activities
            FROM tx_project_tasks AS project_task 
              LEFT JOIN tx_task_members AS task_member ON task_member.task_id = project_task.id
              LEFT JOIN tx_sub_task AS sub_task ON sub_task.task_id = project_task.id
              LEFT JOIN tx_task_notes AS task_note ON task_note.task_id = project_task.id
              LEFT JOIN tx_project_files AS project_file ON project_file.task_id = project_task.id
              LEFT JOIN tx_project_activities AS activities ON activities.task_id = project_task.id
            WHERE project_task.id = '${Id}'`,
        { type: sequelize.QueryTypes.DELETE }
      )
      .then(taskData => {
        resolve(taskData)
      })
      .catch(error => {
        reject(error)
      });
  });
}

module.exports = {
  getTaskById,
  getTaskByProjectId,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  getTaskTypes,
  archiveTask,
  updateTaskByStatus,
  getTaskTypesById,
  archiveTaskStatus
};


