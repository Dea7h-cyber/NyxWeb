/**
 * Get a list of characters
 */

const { validationResult } = require('express-validator')
const logger = require('../Logger')

// Models
const models = require('../../models/')

// Configs
const { limit } = require('../../config/characters/rankings')

module.exports = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.json({
      error: errors.array()[0].msg
    })
  }

  const Character = models.Character()
  const GuildMember = models.GuildMember()

  // if (req.query.search) {
  //   where = { ...where, Name: { [sequelize.Op.like]: `%${req.query.search}%` } }
  // }

  try {
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

    const characters = await Character.findAll({
      offset: 0,
      limit,
      order: [
        ['Resets', 'desc'],
        ['cLevel', 'desc'],
        ['Name', 'asc']
      ],
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

    characters.map(char => {
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

    res.json(characters)
  } catch (error) {
    logger.error(`${error.name}: ${error.message}`)
    res.json({
      error: 'Something went wrong. Please try again later.'
    })
  }
}
