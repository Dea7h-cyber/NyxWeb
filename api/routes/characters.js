const express = require('express');
const router = express.Router();

const config = require('../config').rankings;
const Character = require('../models/character');

/**
 * @route   GET /api/characters
 * @desc    Get a list of characters
 */

router.get('/', async (req, res) => {
  let page = 1, offset;

  // Pagination
  if (req.query.page && isFinite(req.query.page)) {
    page = Number(req.query.page);
    delete req.query.page;
  }

  offset = (page - 1) * config.perPage;
  // End Pagination

  try {
    const characters = await Character.findAll({
      offset,
      limit: config.perPage,
      where: req.query,
      order: [
        ['Resets', 'DESC'],
        ['Name', 'ASC'],
      ],
      attributes: ['id', 'Name', 'Resets', 'cLevel', 'Class', 'Money', 'MapNumber']
    });

    // Passing in next and previous page links
    const next = page + 1;
    const prev = page - 1 > 0 ? page - 1 : null;

    res.status(200).json({ next, prev, characters });
  } catch (error) {
    res.status(404).json({ error: 'Invalid request' });
  }

});

/**
 * @route   GET /api/characters/:name
 * @desc    Get Character info
 */

router.get('/:name', async (req, res) => {
  const character = await Character.findOne({
    where: { Name: req.params.name },
    attributes: ['id', 'Name', 'Resets', 'cLevel', 'Class', 'Money', 'MapNumber']
  });

  if (character) {
    res.status(200).json({ data: character });
  } else {
    res.status(404).json({ error: 'Character not found' });
  }
});

module.exports = router;