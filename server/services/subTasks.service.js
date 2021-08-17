const db = require('../models');
const { sequelize } = require('../models');
const subTasks = db.tx_sub_task;

/**
 * Query for taskData
 * @returns {Promise<QueryResult>}
 */
const getSubTaskByTaskId = (id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT id,name,description,task_id,list_order,status FROM knowledge_base_poly186_i.tx_sub_task WHERE task_id =  ${id}
        ORDER BY list_order`,
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
 * @param {object} createSubTask
 * @return Success : taskData object
 * @return Error : DB error
 */
const createSubTask = async (createSubTask) => {
  return new Promise((resolve, reject) => {
    const {
      taskName,
      description,
      taskId,
      userId
    } = createSubTask

    subTasks.create({
      name: taskName,
      description: description,
      task_id: taskId,
      status: 'Pending',
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
const updateSubTask = async (Data, filter) => {
  return new Promise((resolve, reject) => {
    Data.map(d => {
      subTasks.update(d, { where: { id: d.id } })
        .then((taskData) => {
          resolve(taskData)
        }).catch((error) => {
          console.log(error)
          reject(error);
        });
    })
  });
}

module.exports = {
  getSubTaskByTaskId,
  createSubTask,
  updateSubTask
};


