const db = require('../models');
const config = require('../config/config');
const { sequelize } = require('../models');
const taskMembers = db.tx_task_members;

/**
 * Query for taskData
 * @returns {Promise<QueryResult>}
 */
const getMemberByTaskId = async (id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT user.display_name,task_id,member_id,
            (SELECT post.guid FROM wp_xy27yf_posts AS post WHERE user.id = post.post_author AND post.post_status IN ('publish','inherit') AND 
            post.post_title LIKE 'avatar_%') AS guid
          FROM wp_xy27yf_users AS user
          INNER JOIN tx_task_members AS tm ON user.id = tm.member_id
          INNER JOIN tx_project_tasks AS task ON tm.task_id = task.id
          WHERE task.status != 'Archive' AND task.id = '${id}'`,
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
const getMemberByTask = async (id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT user.display_name,(SELECT post.guid FROM wp_xy27yf_posts AS post WHERE user.id = post.post_author AND post.post_status IN ('publish','inherit') AND 
              post.post_title LIKE 'avatar_%') AS guid
            FROM wp_xy27yf_users AS user
            INNER JOIN tx_task_members AS tm ON user.id = tm.member_id
            INNER JOIN tx_project_tasks AS task ON tm.task_id = task.id
            WHERE task.status != 'Archive' AND task.id = '${id}'`,
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
 * @param {object} createTaskMember
 * @return Success : memberData object
 * @return Error : DB error
 */
const createTaskMember = async (createTaskMember) => {
  return new Promise((resolve, reject) => {
    taskMembers.bulkCreate(createTaskMember, { raw: true })
      .then((memberData) => {
        resolve(memberData)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * @param {Number} Id
 * @return Success : [result:1]
 * @return Error : DB error
 */
const deleteMember = async (Id) => {
  const taskMemberfilter = { where: { task_id: Id } }
  return new Promise((resolve, reject) => {
    taskMembers.destroy(taskMemberfilter)
      .then((memberData) => {
        resolve(memberData);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = {
  getMemberByTaskId,
  createTaskMember,
  deleteMember,
  getMemberByTask
};


