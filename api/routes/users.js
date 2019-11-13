const express = require('express')
const router = express.Router()

const validator = require('../validators/Users')
const actions = require('../actions/Users/')
// const authorization = require('../actions/Authorization')

/**
 * @route   POST /api/users/register
 * @desc    User Registration
 */

router.post('/register', validator.Register, actions.Register)

/**
 * @route   POST /api/users/login
 * @desc    User authorization/login
 */

router.post('/login', validator.Login, actions.Login)

module.exports = router
