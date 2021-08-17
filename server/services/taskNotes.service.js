const db = require('../models');
const { sequelize } = require('../models');
const taskNotes = db.tx_task_notes;


/**
 * Query for taskData
 * @returns {Promise<QueryResult>}
 */
const getTaskNoteById = (id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT task.id,task.name,task.description,task.task_id,user.display_name, task.created_at,
          (SELECT post.guid FROM wp_xy27yf_posts AS post WHERE user.id = post.post_author 
                 AND post.post_status IN ('publish','inherit') AND post.post_title LIKE 'avatar_%') AS guid
          FROM tx_task_notes AS task
          INNER JOIN wp_xy27yf_users AS user ON task.created_by = user.id 
          WHERE task.task_id = ${id}`,
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
const getTaskNoteByNoteId = (id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT task.id,task.name,task.description,task.task_id FROM tx_task_notes AS task
                WHERE task.id = ${id}`,
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
const createTaskNote = async (createTask) => {
  return new Promise((resolve, reject) => {
    const {
      name,
      description,
      taskId,
      userId
    } = createTask

    taskNotes.create({
      name: name,
      description: description,
      task_id: taskId,
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
const updateTaskNote = async (Data, filter) => {
  return new Promise((resolve, reject) => {
    taskNotes.update(Data, filter)
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
const deleteTaskNote = async (Id) => {
  const taskfilter = { where: { id: Id } }
  return new Promise((resolve, reject) => {
    taskNotes.destroy(taskfilter)
      .then((taskData) => {
        resolve(taskData);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = {
  getTaskNoteById,
  createTaskNote,
  updateTaskNote,
  deleteTaskNote,
  getTaskNoteByNoteId
};


