/**
 * Get a list of characters
 */

const { validationResult } = require('express-validator')
const logger = require('../Logger')

// Models
const Character = require('../../models/Character')

// Status
const getCharacterStatus = require('./status')

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
    prev,
    totalPages,
    where = {},
    order = [
      ['Resets', 'DESC'],
      ['cLevel', 'DESC'],
      ['Name', 'ASC']
    ],
    orderDir = 'DESC'

  // Pagination
  if (req.query.page && isFinite(req.query.page)) {
    page = Number(req.query.page)
    delete req.query.page
  }

  // Fetch data WHERE
  const whereAllowed = ['Class', 'Name']
  if (Object.keys(req.query).length > 0) {
    for (let key in req.query) {
      if (whereAllowed.includes(key)) {
        where = { ...where, [key]: req.query[key] }
      }
    }
  }

  // Fetch data ORDER BY
  const orderAllowed = [
    'Name',
    'Resets',
    'cLevel',
    'Money',
    'PkCount',
    'QuestNumber',
    'SkyEventWins'
  ]
  if (req.query.order && orderAllowed.includes(req.query.order)) {
    order = [[req.query.order, req.query.dir ? req.query.dir : orderDir]]
  }

  offset = (page - 1) * rankingsConfig.perPage
  // End Pagination

  try {
    const characters = await Character.findAll({
      offset,
      limit: rankingsConfig.perPage,
      where,
      order,
      attributes: [
        'Name',
        'AccountID',
        'Class',
        'cLevel',
        'Resets',
        'Money',
        'Experience'
      ],
      raw: true
    })

    const totalCharacters = await Character.count({ where })

    // Passing in next and previous page numbers
    totalPages = Math.round(totalCharacters / rankingsConfig.perPage)
    next = page + 1 > totalPages ? null : page + 1
    prev = page > 1 && page <= totalPages ? page - 1 : null

    res.status(200).json({
      prev,
      next,
      totalPages,
      totalCharacters,
      data: characters
    })
  } catch (error) {
    logger.error(error)
    res.json({
      error: 'Something went wrong. Please try again later.'
    })
  }
}
