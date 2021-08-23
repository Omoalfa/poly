const httpStatus = require('http-status')
const config = require('../config/config');
const jwt = require('jsonwebtoken')
const JWT_KEY = config.jwt.secret
const authService = require('../services/auth.service');
const db = require('../models')
const bcrypt = require('bcrypt');
const { mail } = require('./mails.controller')
const emailValidator = require('email-validator') 


const login = async (req, res) => {
  const { email, password } = req.body
  const errors = []

  const validator = async () => {
    if (!password || password.length <= 8) {
      errors.push({
        field: 'password',
        message: 'password must be atleast 8 characters'
      })
    }
    if (!email || !emailValidator.validate(email)) {
      errors.push({
        field: 'email',
        message: 'enter a valid email'
      })
    }
  }

  try {
    validator()

    if (errors.length > 0) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        errors,
        status: httpStatus.BAD_REQUEST
      })
    }
    const user = await db.registers.findOne({ where: { email }})

    if (!user) {
      return res.clearCookie('authorization').status(400).json({
        success: false,
        message: 'invalid credentials',
        status: 400
      })
    }

    const isMatch = bcrypt.compareSync(password, user.password)

    if (!isMatch) {
      return res.clearCookie('authorization').status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'invalid credential',
        status: httpStatus.BAD_REQUEST
      })
    }

    const token = jwt.sign({ email, id: user.id }, JWT_KEY, { expiresIn: '2h' })

    return res
      .cookie('authorization', token)
      .status(httpStatus.OK)
      .redirect(303, '/')
  } catch (error) {
    return res.clearCookie('authorization').status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong',
      status: httpStatus.INTERNAL_SERVER_ERROR
    })
  }
}

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  const errors = []

  const validator = async () => {
    const user = await db.registers.findOne({ where: { email } })
    console.log(user)
    if (user) {
      errors.push({
        field: 'email',
        message: 'email already exist'
      })
    }
    if (!password || password.length <= 8) {
      errors.push({
        field: 'password',
        message: 'password must be atleast 8 characters'
      })
    }
    if (!email || !emailValidator.validate(email)) {
      errors.push({
        field: 'email',
        message: 'enter a valid email'
      })
    }
    if (!lastName || lastName.length < 1) {
      errors.push({
        field: 'lastName',
        message: 'field cannot be empty'
      })
    }
    if (!firstName || firstName.length < 1) {
      errors.push({
        field: 'firstName',
        message: 'field cannot be empty'
      })
    }
  }

  try {
    await validator()

    if (errors.length > 0) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        errors,
        status: httpStatus.BAD_REQUEST
      })
    }
    const hash = bcrypt.hashSync(password, 10)
    const user = await db.registers.create({
      firstName, lastName, email, password: hash
    })

    return res.status(201).json({
      success: true,
      message: 'user account created successfully',
      data: { user },
      status: 201
    })
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: 'something went wrong',
      status: 501
    })
  }
}


const forgotPassword = async (req, res) => {
  const { email } = req.body
  const errors = []
  console.log(email)

  const validator = () => {
    if (!email || !emailValidator.validate(email)) {
      errors.push({
        field: 'email',
        message: 'enter a valid email'
      })
    }
  }

  try {
    validator()

    if (errors.length > 0) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        errors,
        status: httpStatus.BAD_REQUEST
      })
    }
    const user = db.registers.findOne({ where: { email } })

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'user not found',
        status: httpStatus.NOT_FOUND,
      })
    }

    const token = jwt.sign({ email, id: user.id })

    // await mail.sendMail({
    //   to: email,
    //   html: `
    //   <div>
    //     <h3>Click on the link below to continue password reset<h3>
    //     <a href='${process.env.HOST}/${process.env.PORT}/forgotpassword/${token}'> Click Me To Continue </a>
    //   </div>  
    // `,
    //   subject: 'Password Reset',
    //   from: 'Admin'
    // })

    return res.status(httpStatus.OK).json({
      success: true,
      message: 'Password reset link sent',
      token,
      status: httpStatus.OK
    })

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error,
      status: httpStatus.INTERNAL_SERVER_ERROR
    })
  }
}


const resetPassword = async (req, res) => {
  const { token } = req.params
  const { password } = req.body

  try {
    const { email } = jwt.verify(token, JWT_KEY)

    newPassword = bcrypt.hashSync(password, 10)

    const user = await db.registers.update({ password: newPassword }, { where: { email }})

    return res.status(httpStatus.OK).json({
      success: true,
      message: 'Password changed successfully',
      status: httpStatus.OK

    })

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong',
      status: httpStatus.INTERNAL_SERVER_ERROR
    })    
  }
}

/**
 * @input : Form( Object ) : String :: email and password and ID
 * @return Success : { "result": true }
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
// const loginUser = (req, res) => {
//   const { user_email, ID } = req.body;
//   if (user_email != '') {
//     const userEmailList = ['poly186.io@gmail.com', 'Princepspolycap@gmail.com', 'dev@tecxar.io'];
//     const isAdmin = userEmailList.includes(user_email);
//     const token = jwt.sign({ email: user_email, id: ID, isAdmin }, JWT_KEY, { expiresIn: '24h' });
//     authService.updateAccessToken(token, ID).then(response => {
//       return res
//         .cookie('authorization', token)
//         .status(httpStatus.OK)
//         .redirect(303, '/')
//     }).catch(error => {
//       return res
//         .clearCookie('authorization')
//         .status(httpStatus.UNAUTHORIZED)
//         .redirect(303, '/login')
//     })
//   } else {
//     return res
//         .clearCookie('authorization')
//         .status(httpStatus.UNAUTHORIZED)
//         .redirect(303, '/login')
//   }
// }

// const loginWithToken = (req, res) => {
//   const { token } = req.params;
//   authService
//     .validateAccess(token)
//     .then(response => {
//       res.cookie('authorization', token, {
//         expires: new Date(Date.now() + 86400000),
//       });
//       res.redirect(303, "/")
//     })
//     .catch((error) => {
//       res
//         .status(httpStatus.UNAUTHORIZED)
//         .send({ error: { code: httpStatus.UNAUTHORIZED, message: 'Not Authorized' } })
//     }
//     );
// }

const validateAccess = (req, res) => {
  const { authorization } = req.cookies;
  console.log(req)
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
  login,
  registerUser,
  forgotPassword,
  resetPassword,
  validateAccess
}
