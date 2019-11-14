/**
 * Get a single character
 */

const logger = require('../Logger')

// Models
const models = require('../../models/')

// Status
const characterStatus = require('./status')

module.exports = async (req, res) => {
  try {
    const character = await models.Character.findOne({
      where: { Name: req.params.name },
      attributes: [
        'Name',
        'AccountID',
        'Class',
        'cLevel',
        'Resets',
        'Money',
        'LevelUpPoint',
        'Experience',
        'PkCount',
        'Inventory'
      ],
      raw: true
    })

    if (character) {
      character.status = await characterStatus(
        character.AccountID,
        character.Name
      )
      delete character.AccountID

      character.Inventory = character.Inventory.toString('hex').slice(0, 240)

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
