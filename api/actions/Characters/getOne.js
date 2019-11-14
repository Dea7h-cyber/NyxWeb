/**
 * Get a single character
 */

const logger = require('../Logger')

// Models
const models = require('../../models/')

module.exports = async (req, res) => {
  try {
    const Character = models.Character()

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

    const character = await Character.findOne({
      where: { Name: req.params.name },
      attributes: [
        'Name',
        'Class',
        'cLevel',
        'Resets',
        'Money',
        'LevelUpPoint',
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

    if (character) {
      character.status =
        character['a.ConnectStat'] === 1 &&
        character['b.GameIDC'] === character.Name
          ? true
          : false

      character.Inventory = character.Inventory.toString('hex').slice(0, 240)

      delete character['a.ConnectStat']
      delete character['b.GameIDC']

      res.json(character)
    } else {
      res.json({ error: 'Character with this name could not be found' })
    }
  } catch (error) {
    logger.error(`${error.name}: ${error.message}`)
    res.json({
      error: 'Something went wrong. Please try again later.'
    })
  }
}
