const db = require('../models');
const { sequelize } = require('../models');
const TaskStatusType = db.tx_task_status_types;
/**
 * Query for taskStatusTypeData
 * @returns {Promise<QueryResult>}
 */
const getTaskStatusType = () => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT id,name,status FROM tx_task_status_types WHERE status != 'Archive' ORDER BY id ASC`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(taskStatusTypeData => {
        resolve(taskStatusTypeData)
      })
      .catch(error => {
        reject(error)
      });
  });
};

/**
 * Query for taskStatusTypeData
 * @returns {Promise<QueryResult>}
 */
const getTaskStatusTypeById = (Id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT id,name,status FROM tx_task_status_types where id= '${Id}'`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(taskStatusTypeData => {
        resolve(taskStatusTypeData)
      })
      .catch(error => {
        reject(error)
      });
  });
};

/**
 * @param {object} data
 * @return Success : taskStatusTypeData object
 * @return Error : DB error
 */
const createTaskStatusType = async (data) => {
  return new Promise((resolve, reject) => {
    const {
      name,
      status,
      created_by,
      created_at
    } = data

    TaskStatusType.create({
      name: name,
      status: status,
      created_at: created_at,
      created_by: created_by
    }, { raw: true })
      .then((taskStatusTypeData) => {
        resolve(taskStatusTypeData)
      })
      .catch((error) => {
        reject(error)
      })
  })
}


/**
 * Query for taskStatusTypeData
 * @returns {Promise<QueryResult>}
 */
const updateTaskStatusType = ((Data, filter) => {
  return new Promise((resolve, reject) => {
    TaskStatusType.update(Data, filter)
      .then((taskStatusTypeData) => {
        resolve(taskStatusTypeData)
      }).catch((error) => {
        reject(error);
      });
  });
})

module.exports = {
  getTaskStatusType,
  getTaskStatusTypeById,
  updateTaskStatusType,
  createTaskStatusType
};


