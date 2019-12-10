/**
 * Get a single character
 */

const logger = require('../Logger')

const characterStatus = require('./status')

// Models
const models = require('../../models/')

module.exports = async (req, res) => {
  try {
    const Character = models.Character()

    const character = await Character.findOne({
      where: { Name: req.params.name },
      attributes: [
        'AccountID',
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
      raw: true
    })

    if (character) {
      character.status = characterStatus(character.AccountID, character.Name)

      character.Inventory = character.Inventory.toString('hex').slice(0, 240)

      delete character.AccountID

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
