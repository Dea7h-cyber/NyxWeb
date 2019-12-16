const express = require('express')
const router = express.Router()

const validator = require('../validators/Users')
const actions = require('../actions/Users/')
const authorization = require('../actions/Authorization')

/**
 * @route   POST /api/users/authorize
 * @desc    User authorization/login
 */

router.post('/authorize', validator.Login, actions.Login)

/**
 * @route   GET /api/users/verification
 * @desc    User token verification
 */

router.get('/verification', actions.Verification)

/**
 * @route   POST /api/users/register
 * @desc    User Registration
 */

router.post('/register', validator.Register, actions.Register)

/**
 * @route   GET /api/users/characters
 * @desc    User Characters
 */

router.get('/characters', authorization, actions.getUserCharacters)

/**
 * @route   GET /api/users/resources
 * @desc    User Resources
 */

router.get('/resources', authorization, actions.getResources)

/**
 * @route   GET /api/users/warehouse
 * @desc    User Warehouse
 */

router.get('/warehouse', authorization, actions.getWarehouse)

module.exports = router
