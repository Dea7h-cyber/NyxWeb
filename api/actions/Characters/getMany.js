/**
 * Get a list of characters
 */

const { validationResult } = require('express-validator')
const logger = require('../Logger')

// Models
const models = require('../../models/')

// Status
// const characterStatus = require('./status')

// Configs
const rankingsConfig = require('../../config/characters/rankings')

module.exports = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.json({
      error: errors.array()[0].msg
    })
  }

  let offset,
    next,
    prev,
    where = {},
    order = [
      ['Resets', 'DESC'],
      ['cLevel', 'DESC'],
      ['Name', 'ASC']
    ],
    orderDir = 'DESC'

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

  try {
    // Pagination
    const totalCharacters = await models.Character.count({ where })
    let totalPages = Math.round(totalCharacters / rankingsConfig.perPage)
    if (totalPages === 0) {
      totalPages = 1
    }

    let page = Number(req.query.page ? req.query.page : 1)
    if (page > totalPages) {
      page = totalPages
    }

    offset = (page - 1) * rankingsConfig.perPage
    // End Pagination

    const characters = await models.Character.findAll({
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
        'Experience',
        'PkCount',
        'Inventory'
      ],
      raw: true
      // include: [
      //   {
      //     model: models.MEMB_STAT,
      //     attributes: ['ConnectStat']
      //   }
      // ]
    })

    // Passing in next and previous page numbers
    next = page + 1 > totalPages ? null : page + 1
    prev = page > 1 && page <= totalPages ? page - 1 : null

    characters.map(char => {
      delete char.AccountID
      char.status = false //TODO to get the actual status with inner join query?
      char.Inventory =
        char.Inventory && char.Inventory.length > 0
          ? char.Inventory.toString('hex').slice(0, 240)
          : null
      return char
    })

    res.json({
      prev,
      next,
      totalPages,
      totalCharacters,
      perPage: rankingsConfig.perPage,
      data: characters

      // data: await Promise.all(
      //   [...characters].map(async char => {
      //     char.status = await characterStatus(char.AccountID, char.Name)
      //     delete char.AccountID
      //     char.Inventory =
      //       char.Inventory && char.Inventory.length > 0
      //         ? char.Inventory.toString('hex').slice(0, 240)
      //         : null
      //     return char
      //   })
      // )
    })
  } catch (error) {
    logger.error(`${error.name}: ${error.message}`)
    res.json({
      error: 'Something went wrong. Please try again later.'
    })
  }
}
