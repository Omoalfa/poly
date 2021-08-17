const db = require('../models');
const { sequelize } = require('../models');
const projectActivity = db.tx_project_activities;


/**
 * Query for activityData
 * @returns {Promise<QueryResult>}
 */
const getActivites = () => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT activity.activity_name,activity.sub_activity,activity.created_at,user.display_name AS name,
            (SELECT post.guid FROM wp_xy27yf_posts AS post WHERE user.id = post.post_author AND post.post_status IN ('publish','inherit') AND post.post_title LIKE 'avatar_%') AS profile_photo  
            FROM tx_project_activities AS activity
              INNER JOIN wp_xy27yf_users AS user ON activity.created_by = user.id
         `,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(activityData => {
        resolve(activityData)
      })
      .catch(error => {
        reject(error)
      });
  });
};

/**
 * Query for activityData
 * @returns {Promise<QueryResult>}
 */
const getActivityByProjectId = (Id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT activity.activity_name,activity.sub_activity,activity.created_at,user.display_name AS name,
        (SELECT post.guid FROM wp_xy27yf_posts AS post WHERE user.id = post.post_author AND post.post_status IN ('publish','inherit') AND post.post_title LIKE 'avatar_%') AS profile_photo  
            FROM tx_project_activities AS activity
              INNER JOIN wp_xy27yf_users AS user ON activity.created_by = user.id
            WHERE activity.project_id = ${Id}
            ORDER BY activity.id DESC
         `,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(activityData => {
        resolve(activityData)
      })
      .catch(error => {
        reject(error)
      });
  });
};

/**
 * Query for activityData
 * @returns {Promise<QueryResult>}
 */
 const getActivityByTaskId = (Id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT activity.activity_name,activity.sub_activity,activity.created_at,user.display_name AS name,
        (SELECT post.guid FROM wp_xy27yf_posts AS post WHERE user.id = post.post_author AND post.post_status IN ('publish','inherit') AND post.post_title LIKE 'avatar_%') AS profile_photo  
            FROM tx_project_activities AS activity
              INNER JOIN wp_xy27yf_users AS user ON activity.created_by = user.id
            WHERE activity.task_id = ${Id}
            ORDER BY activity.id DESC
         `,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(activityData => {
        resolve(activityData)
      })
      .catch(error => {
        reject(error)
      });
  });
};



/**
 * @param {object} createActivity
 * @return Success : activityData object
 * @return Error : DB error
 */
const createActivity = async(createActivity) =>{
  return new Promise((resolve, reject) => {
    projectActivity.create(createActivity, { raw: true })
      .then((activityData) => {
        resolve(activityData)
      })
      .catch((error) => {
        reject(error)
      })
  }) 
}

module.exports = {
  getActivites,
  createActivity,
  getActivityByProjectId,
  getActivityByTaskId
};


