const config = require('../config/config');
const jwt = require('jsonwebtoken')
const JWT_KEY = config.jwt.secret

/**
 * @param {String} token
 * @return Success : { user: x, bearerToken: x }
 * @return Error : DB error or User not Found
 */
const verifyAccessToken = (token) =>
  new Promise(function (resolve, reject) {
    jwt.verify(token, JWT_KEY, function (err, decoded) {
      if (err) {
        reject(err);
      } else {
        resolve({ email: decoded.email, id: decoded.id });
      }
    });
  });

module.exports = {
  verifyAccessToken
};
