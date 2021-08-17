const { sequelize } = require('../models');

/**
 * Query for projectData
 * @returns {Promise<QueryResult>}
 */
const checkEmailDuplication = (email) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT COUNT(*) AS count FROM wp_xy27yf_users WHERE user_email = '${email}'`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(emailData => {
        resolve(emailData)
      })
      .catch(error => {
        reject(error)
      });
  });
};

module.exports = {
  checkEmailDuplication
};


