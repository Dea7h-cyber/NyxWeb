const express = require('express')
const router = express.Router()

const validator = require('../validators/Characters')
const actions = require('../actions/Characters/')
const authorization = require('../actions/Authorization')

/**
 * @route   GET /api/characters
 * @desc    Get a list of characters
 */

router.get('/', validator.getMany, actions.getMany)

/**
 * @route   GET /api/characters/:name
 * @desc    Get Character info
 */

router.get('/:name', actions.getOne)

/**
 * @route   PATCH /api/characters/:name/reset
 * @desc    Reset a Character
 */

router.patch('/:name/reset', authorization, actions.Reset)

/**
 * @route   PATCH /api/characters/:name/addstats
 * @desc    Add stats to a Character
 */

router.patch(
  '/:name/addstats',
  [authorization, validator.addStats],
  actions.addStats
)

/**
 * @route   PATCH /api/characters/:name/pkclear
 * @desc    PK Clears a Character
 */

router.patch('/:name/pkclear', authorization, actions.pkClear)

module.exports = router
