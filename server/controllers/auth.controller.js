const httpStatus = require('http-status')
const config = require('../config/config');
const jwt = require('jsonwebtoken')
const JWT_KEY = config.jwt.secret
const authService = require('../services/auth.service');

/**
 * @input : Form( Object ) : String :: email and password and ID
 * @return Success : { "result": true }
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const loginUser = (req, res) => {
  const { user_email, ID } = req.body;
  if (user_email != '') {
    const userEmailList = ['poly186.io@gmail.com', 'Princepspolycap@gmail.com', 'dev@tecxar.io'];
    const isAdmin = userEmailList.includes(user_email);
    const token = jwt.sign({ email: user_email, id: ID, isAdmin }, JWT_KEY, { expiresIn: '24h' });
    authService.updateAccessToken(token, ID).then(response => {
      res.status(httpStatus.OK).send({ "token": token });
    }).catch(error => {
      console.log(error)
      res.status(httpStatus.UNAUTHORIZED).send('fail');
    })
  } else {
    res.status(httpStatus.UNAUTHORIZED).send('fail');
  }
}

const loginWithToken = (req, res) => {
  const { token } = req.params;
  authService
    .validateAccess(token)
    .then(response => {
      res.cookie('authorization', token, {
        expires: new Date(Date.now() + 86400000),
      });
      res.redirect("/")
    })
    .catch((error) => {
      res
        .status(httpStatus.UNAUTHORIZED)
        .send({ error: { code: httpStatus.UNAUTHORIZED, message: 'Not Authorized' } })
    }
    );
}

const validateAccess = (req, res) => {
  const { authorization } = req.cookies;
  authService
    .validateAccess(authorization)
    .then(user => {
      res
        .status(httpStatus.OK)
        .send({ user })
    })
    .catch((error) => {
      console.log(error)
      res
        .status(httpStatus.UNAUTHORIZED)
        .send({ error: { code: httpStatus.UNAUTHORIZED, message: 'Not Authorized' } })
    }
    );

}

module.exports = {
  loginUser,
  loginWithToken,
  validateAccess
}
