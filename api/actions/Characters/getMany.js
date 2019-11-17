/**
 * Get a list of characters
 */

const sequelize = require('sequelize')
const { validationResult } = require('express-validator')
const logger = require('../Logger')

// Models
const models = require('../../models/')

// Configs
const rankingsConfig = require('../../config/characters/rankings')

module.exports = async (req, res) => {
  const Character = models.Character()
  const GuildMember = models.GuildMember()

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.json({
      error: errors.array()[0].msg
    })
  }

  // Fetch data WHERE
  const allowedClasses = [0, 1, 16, 17, 32, 33, 48, 64]
  let where

  if (req.query.class) {
    const classSearch = req.query.class.split(',').map(cls => Number(cls))
    if (
      !classSearch.includes(1) ||
      !classSearch.includes(17) ||
      !classSearch.includes(33) ||
      !classSearch.includes(48) ||
      !classSearch.includes(64)
    ) {
      where = { [sequelize.Op.or]: [] }
      for (let cls of classSearch) {
        if (allowedClasses.includes(cls)) {
          where[sequelize.Op.or].push({ Class: cls })
        }
      }
    }
  }

  if (req.query.search) {
    where = { ...where, Name: { [sequelize.Op.like]: `%${req.query.search}%` } }
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

  let order = [
    ['Resets', 'desc'],
    ['cLevel', 'desc'],
    ['Name', 'asc']
  ]

  if (req.query.order) {
    const ord = req.query.order.split(',')
    if (orderAllowed.includes(ord[0])) {
      order = order.filter(p => p[0] !== ord[0])
      order.unshift([ord[0], ord[1] === 'asc' ? 'asc' : 'desc'])
    }
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

    Character.hasOne(GuildMember, {
      as: 'gm',
      sourceKey: 'Name',
      foreignKey: 'Name'
    })

    GuildMember.hasOne(models.Guild, {
      as: 'g',
      sourceKey: 'G_Name',
      foreignKey: 'G_Name'
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
        },
        {
          model: GuildMember,
          as: 'gm',
          attributes: ['G_Name'],
          include: [
            {
              model: models.Guild,
              as: 'g',
              attributes: ['G_Mark']
            }
          ]
        }
      ]
    })

    // Passing in next and previous page numbers
    const totalPages = Math.ceil(characters.count / rankingsConfig.perPage)
    const prev =
      page > 1 && page <= totalPages
        ? page - 1
        : page === 1
        ? 1
        : totalPages - 1
    const next = page + 1 > totalPages ? totalPages : page + 1

    characters.rows.map(char => {
      char.status =
        char['a.ConnectStat'] === 1 && char['b.GameIDC'] === char.Name
          ? true
          : false

      char.lastConnect = char['a.ConnectTM']
      char.lastDisconnect = char['a.DisConnectTM']

      char.Inventory =
        char.Inventory && char.Inventory.length > 0
          ? char.Inventory.toString('hex').slice(0, 240)
          : null

      char.Guild = char['gm.G_Name']
      char.GuildMark = char['gm.g.G_Mark']
        ? char['gm.g.G_Mark'].toString('hex')
        : null

      delete char['a.ConnectTM']
      delete char['a.DisConnectTM']
      delete char['a.ConnectStat']
      delete char['b.GameIDC']
      delete char['gm.G_Name']
      delete char['gm.g.G_Mark']
      delete char['gm.g.G_Name']
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
