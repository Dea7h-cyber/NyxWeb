/**
 * Get a list of characters
 */

const { validationResult } = require('express-validator')
const logger = require('../Logger')

// Models
const models = require('../../models/')

// Configs
const rankingsConfig = require('../../config/characters/rankings')

module.exports = async (req, res) => {
  const Character = models.Character()

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.json({
      error: errors.array()[0].msg
    })
  }

  let next
  let prev
  let where = {}
  let orderDir = 'DESC'
  let order = [
    ['Resets', 'DESC'],
    ['cLevel', 'DESC'],
    ['Name', 'ASC']
  ]

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
    const page = Number(req.query.page ? req.query.page : 1)
    const offset = (page - 1) * rankingsConfig.perPage

    // Joining tables
    Character.hasOne(models.MEMB_STAT, {
      as: 'a',
      sourceKey: 'AccountID',
      foreignKey: 'memb___id'
    })

    Character.hasOne(models.AccountCharacter, {
      as: 'b',
      sourceKey: 'AccountID',
      foreignKey: 'Id'
    })

    const characters = await Character.findAndCountAll({
      offset,
      limit: rankingsConfig.perPage,
      where,
      order,
      attributes: [
        'Name',
        'Class',
        'cLevel',
        'Resets',
        'Money',
        'Experience',
        'PkCount',
        'Inventory'
      ],
      raw: true,
      include: [
        {
          model: models.MEMB_STAT,
          as: 'a',
          attributes: ['ConnectStat', 'ConnectTM', 'DisConnectTM']
        },
        {
          model: models.AccountCharacter,
          as: 'b',
          attributes: ['GameIDC']
        }
      ]
    })

    // Passing in next and previous page numbers
    const totalPages = Math.ceil(characters.count / rankingsConfig.perPage)
    prev =
      page > 1 && page <= totalPages
        ? page - 1
        : page === 1
        ? 1
        : totalPages - 1
    next = page + 1 > totalPages ? totalPages : page + 1

    characters.rows.map(char => {
      char.status =
        char['a.ConnectStat'] === 1 && char['b.GameIDC'] === char.Name
          ? true
          : false

      char.Inventory =
        char.Inventory && char.Inventory.length > 0
          ? char.Inventory.toString('hex').slice(0, 240)
          : null

      delete char['a.ConnectStat']
      delete char['b.GameIDC']
      return char
    })

    res.json({
      prev,
      next,
      totalPages,
      totalCharacters: characters.count,
      perPage: rankingsConfig.perPage,
      data: characters.rows
    })
  } catch (error) {
    logger.error(`${error.name}: ${error.message}`)
    res.json({
      error: 'Something went wrong. Please try again later.'
    })
  }
}
