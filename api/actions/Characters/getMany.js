/**
 * Get a list of characters
 */

const { validationResult } = require('express-validator')
const logger = require('../Logger')

// Models
const Character = require('../../models/Character')

// Configs
const rankingsConfig = require('../../config/characters/rankings')

module.exports = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.json({
      error: errors.array()[0].msg
    })
  }

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
      order: [
        ['Resets', 'DESC'],
        ['cLevel', 'DESC'],
        ['Name', 'ASC']
      ],
      attributes: ['Name', 'Class', 'cLevel', 'Resets', 'Money', 'Experience']
    })

    const count = await Character.count()

    // Passing in next and previous page numbers
    next = page + 1 > count / rankingsConfig.perPage ? null : page + 1
    prev = page > 1 && page <= count / rankingsConfig.perPage ? page - 1 : null

    res.status(200).json({ prev, next, count, data: characters })
  } catch (error) {
    logger.error(error)
    res.json({
      error: 'Something went wrong. Please try again later.'
    })
  }
}
