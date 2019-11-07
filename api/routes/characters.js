const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const actions = require('../actions/Characters/');
const authorization = require('../actions/Authorization');

/**
 * @route   GET /api/characters
 * @desc    Get a list of characters
 */

router.get('/', actions.getMany);

/**
 * @route   GET /api/characters/:name
 * @desc    Get Character info
 */

router.get('/:name', actions.getOne);

/**
 * @route   PATCH /api/characters/:name/reset
 * @desc    Reset a Character
 */

router.patch('/:name/reset', authorization, actions.Reset);

/**
 * @route   PATCH /api/characters/:name/addstats
 * @desc    Add stats to a Character
 */

router.patch(
  '/:name/addstats',
  [
    authorization,
    [
      check('Strength', 'Strength field is required').isInt(),
      check('Dexterigy', 'Agility field is required').isInt(),
      check('Vitality', 'Vitality field is required').isInt(),
      check('Energy', 'Energy field is required').isInt(),
      check('Leadership', 'Command field is required').isInt()
    ]
  ],
  actions.addStats
);

/**
 * @route   PATCH /api/characters/:name/pkclear
 * @desc    PK Clears a Character
 */

router.patch('/:name/pkclear', authorization, actions.pkClear);

module.exports = router;
