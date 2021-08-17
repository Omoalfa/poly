const tokenService = require('./token.service')
const db = require('../models');
const { sequelize } = require('../models');


/**
 * @param {String} authToken
 * @return Success : user
 * @return Error : DB error
 */
const validateAccess = authToken =>
  new Promise((resolve, reject) => {
    const userEmailList = ['poly186.io@gmail.com', 'Princepspolycap@gmail.com', 'dev@tecxar.io'];
    tokenService
      .verifyAccessToken(authToken)
      .then(user => {
        user.isAdmin = userEmailList.includes(user.email);
        resolve(user)
      })
      .catch(error => {
        reject(error)
      })
  })

/**
* @param {String} token
* @return Success : { user: x, bearerToken: x }
* @return Error : DB error or User not Found
*/
const checkAccessToken = (token, id) =>
  new Promise(function (resolve, reject) {
    sequelize
      .query(
        `SELECT platform_session FROM wp_xy27yf_users WHERE ID = ${id}`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
      });
  });

/**
* @param {String} token
* @return Success : { user: x, bearerToken: x }
* @return Error : DB error or User not Found
*/
const updateAccessToken = (token, id) =>
  new Promise(function (resolve, reject) {
    sequelize
      .query(
        `UPDATE wp_xy27yf_users SET platform_session= '${token}' WHERE ID = ${id}`,
        { type: sequelize.QueryTypes.UPDATE }
      )
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
      });
  });

module.exports = {
  validateAccess,
  checkAccessToken,
  updateAccessToken
}
