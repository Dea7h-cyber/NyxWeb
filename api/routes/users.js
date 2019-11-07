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
    check('username').isString({
      min: 4,
      max: 10
    }),
    check('password').isString({
      min: 4,
      max: 10
    }),
    check('email').isEmail()
  ],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: 'Your request has been denied. Please try again later.'
      })
    }

    actions.Register(req, res)
  }
)

/**
 * @route   POST /api/users/authentication
 * @desc    User authentication/login
 */

router.post(
  '/authentication',
  [
    check('username').isString({
      min: 4,
      max: 10
    }),
    check('password').isString({
      min: 4,
      max: 10
    })
  ],
  actions.Authentication
)

module.exports = router
