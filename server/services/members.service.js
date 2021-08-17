const { sequelize } = require('../models');

/**
 * Query for memberData
 * @returns {Promise<QueryResult>}
 */
const getMembers = () => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT user.id,user.display_name,'' AS designation,(SELECT post.guid FROM wp_xy27yf_posts AS post WHERE  user.id = post.post_author AND post.post_status IN ('publish','inherit') AND post.post_title LIKE 'avatar_%') AS guid
        FROM wp_xy27yf_users AS user`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(memberData => {
        resolve(memberData)
      })
      .catch(error => {
        reject(error)
      });
  });
};

/**
 * Query for memberData
 * @returns {Promise<QueryResult>}
 */
const getMemberByProjectId = (id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT user.id,user.display_name,'' AS designation,
            (SELECT post.guid FROM wp_xy27yf_posts AS post WHERE user.id = post.post_author AND post.post_status IN ('publish','inherit') AND 
                post.post_title LIKE 'avatar_%') AS guid 
            FROM wp_xy27yf_users AS user
            INNER JOIN tx_project_members AS pm ON user.id = pm.member_id
            WHERE pm.project_id = ${id}`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(memberData => {
        resolve(memberData)
      })
      .catch(error => {
        reject(error)
      });
  });
};

module.exports = {
  getMembers,
  getMemberByProjectId
};


