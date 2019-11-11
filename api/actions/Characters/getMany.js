/**
 * Get a list of characters
 */

const logger = require('../Logger')

// Models
const Character = require('../../models/Character')

// Configs
const rankingsConfig = require('../../config/characters/rankings')

module.exports = async (req, res) => {
  let page = 1,
    offset,
    next,
    prev

  // Pagination
  if (req.query.page && isFinite(req.query.page)) {
    page = Number(req.query.page)
    delete req.query.page
  }

  offset = (page - 1) * rankingsConfig.perPage
  // End Pagination

  try {
    const characters = await Character.findAll({
      offset,
      limit: rankingsConfig.perPage,
      where: req.query,
      order: [['Resets', 'DESC'], ['cLevel', 'DESC'], ['Name', 'ASC']],
      attributes: ['Name', 'Class', 'cLevel', 'Resets', 'Money', 'Experience']
    })

    // Passing in next and previous page numbers
    next = page + 1
    prev = page - 1 > 0 ? page - 1 : null

    res.status(200).json({ next, prev, data: characters })
  } catch (error) {
    logger.error(error)
    res.json({
      error: 'Something went wrong. Please try again later.'
    })
  }
}
