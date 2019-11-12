const express = require('express')
const router = express.Router()
const { check, validationResult, query } = require('express-validator')

const actions = require('../actions/Characters/')
const authorization = require('../actions/Authorization')

/**
 * @route   GET /api/characters
 * @desc    Get a list of characters
 */

router.get('/', [query('page').isInt({ min: 1 })], actions.getMany)

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
  [
    authorization,
    [
      check('Strength').isInt({
        min: 0,
        max: 64000
      }),
      check('Dexterity').isInt({
        min: 0,
        max: 64000
      }),
      check('Vitality').isInt({
        min: 0,
        max: 64000
      }),
      check('Energy').isInt({ min: 0, max: 64000 }),
      check('Leadership').isInt({
        min: 0,
        max: 64000
      })
    ]
  ],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: 'Your request has been denied. Please try again later.'
      })
    }

    actions.addStats(req, res)
  }
)

/**
 * @route   PATCH /api/characters/:name/pkclear
 * @desc    PK Clears a Character
 */

router.patch('/:name/pkclear', authorization, actions.pkClear)

module.exports = router
