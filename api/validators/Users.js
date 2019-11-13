const { check } = require('express-validator')

const Register = [
  check('username')
    .matches(/^[a-z0-9]{4,10}$/i)
    .withMessage(
      'Your Username cannot be less than 4 and more than 10 characters'
    ),
  check('password')
    .matches(/^[a-z0-9]{4,10}$/i)
    .withMessage(
      'Your Password cannot be less than 4 and more than 10 characters'
    ),
  /* .custom((value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error('Passwords do not match!')
      }
    }) */ check(
    'email'
  )
    .isEmail()
    .normalizeEmail()
    .isLength({ max: 35 })
    .withMessage('Invalid E-Mail Adress')
]

const Login = [
  check('username')
    .isString()
    .matches(/^[a-z0-9]{4,10}$/i),
  check('password')
    .isString()
    .matches(/^[a-z0-9]{4,10}$/i)
]

module.exports = {
  Register,
  Login
}
