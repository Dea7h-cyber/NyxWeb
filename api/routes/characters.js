const express = require('express');
const router = express.Router();

const actions = require('../actions/Characters/');
const authorization = require('../actions/Authorization');

/**
 * @route   GET /api/characters
 * @desc    Get a list of characters
 */

router.get('/', actions.getCharacters);

/**
 * @route   GET /api/characters/:name
 * @desc    Get Character info
 */

router.get('/:name', actions.getCharacter);

/**
 * @route   PATCH /api/characters/:name/reset
 * @desc    Reset a Character
 */

router.patch('/:name/reset', authorization, actions.Reset);

module.exports = router;