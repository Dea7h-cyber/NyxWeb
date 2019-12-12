const { check } = require('express-validator')

const Register = [
  check('username')
    .isString()
    .matches(/^[a-z0-9]+$/i)
    .withMessage('Your Username can only contain letters and digits')
    .matches(/^[a-z0-9]{4,10}$/i)
    .withMessage(
      'Your Username cannot be less than 4 and more than 10 characters'
    ),
  check('password')
    .isString()
    .matches(/^[a-z0-9]+$/i)
    .withMessage('Your Password can only contain letters and digits')
    .matches(/^[a-z0-9]{4,10}$/i)
    .withMessage(
      'Your Password cannot be less than 4 and more than 10 characters'
    )
    .custom((value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error('Entered Passwords do not match')
      }
      return true
    }),
  check('email', 'Invalid E-Mail Adress')
    .isEmail()
    .normalizeEmail()
    .isLength({ max: 35 })
]

const Login = [
  check('username', 'Invalid credentials')
    .isString()
    .matches(/^[a-z0-9]{4,10}$/i),
  check('password', 'Invalid credentials')
    .isString()
    .matches(/^[a-z0-9]{4,10}$/i)
]

module.exports = {
  Register,
  Login
}
