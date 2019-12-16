/**
 * PK Clear function
 */

const logger = require('../Logger')

// Models
const models = require('../../models/')

// Configs
const pkConfig = require('../../config/characters/pkClear')

// Helper functions
const status = require('./status')

module.exports = async (req, res) => {
  const AccountID = req.username
  const Name = req.params.name
  const Character = models.Character()

  // Check for character status
  if (await status(AccountID, Name)) {
    return res.json({
      error: `${Name} make sure you are offline and try again.`
    })
  }

  try {
    const character = await Character.findOne({
      where: { AccountID, Name },
      attributes: ['Name', 'PkCount', 'PkLevel', 'PkTime', 'Money']
    })

    if (!character) {
      return res.json({ error: "This Character could'nt be found" })
    }

    // Check if character is PK
    if (!(character.PkCount > 0)) {
      return res.json({
        error: `You are not a murderer, ${character.Name}.`
      })
    }

    // Stats adder cost check
    const pkCost =
      pkConfig.mode === 1 ? pkConfig.cost : pkConfig.cost * character.PkCount
    if (character.Money < pkCost) {
      return res.json({
        error: `You need ${pkCost.toLocaleString()} zen to clear your ${
          character.PkCount
        } kills, ${character.Name}.`
      })
    }

    // Clear kills and get cost
    character.PkCount = 0
    character.PkLevel = 0
    character.PkTime = 0
    character.Money -= pkCost

    // Perform a character update
    character.save()

    res.json({
      message: `Greetings ${Name}! Your kills were successfully cleared!`
    })
  } catch (error) {
    logger.error(`${error.name}: ${error.message}`)
    res.json({
      error: 'Something went wrong. Please try again later.'
    })
  }
}
