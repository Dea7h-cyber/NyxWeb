const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const actions = require('../actions/Users/')
// const authorization = require('../actions/Authorization')

/**
 * @route   POST /api/users/register
 * @desc    User Registration
 */

router.post(
  '/register',
  [
    check('username')
      .matches(/^[a-z0-9]{4,10}$/i)
      .withMessage(
        'Your Username cannot be less than 4 and more than 10 characters'
      ),
    check('password')
      .matches(/^[a-z0-9]{4,10}$/i)
      .withMessage(
        'Your Password cannot be less than 4 and more than 10 characters'
      )
      .custom((value, { req }) => {
        if (value !== req.body.repassword) {
          throw new Error('Passwords do not match!')
        }
      }),
    check('email')
      .isEmail()
      .normalizeEmail()
      .isLength({ max: 35 })
      .withMessage('Invalid E-Mail Adress')
  ],
  (req, res) =>
    validationResult(req).isEmpty()
      ? actions.Register(req, res)
      : res.json({ error: validationResult(req).errors[0].msg })
)

/**
 * @route   POST /api/users/authorization
 * @desc    User authorization/login
 */

router.post(
  '/authorization',
  [
    check('username')
      .isString()
      .matches(/^[a-z0-9]{4,10}$/i),
    check('password')
      .isString()
      .matches(/^[a-z0-9]{4,10}$/i)
  ],
  (req, res) =>
    validationResult(req).isEmpty()
      ? actions.Authorization(req, res)
      : res.json({ error: 'Wrong Username/Password.' })
)

module.exports = router
