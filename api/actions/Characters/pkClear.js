/**
 * PK Clear function
 */

const logger = require('../Logger')

// Models
const Character = require('../../models/Character')

// Configs
const pkConfig = require('../../config/characters/pkClear')

// Helper functions
const status = require('./status')

module.exports = async (req, res) => {
  const AccountID = req.cookies.nyx_user
  const Name = req.params.name

  // Check for character status
  if (await status(AccountID, Name)) {
    return res.json({
      error: `${Name} make sure you are offline and try again.`
    })
  }

  let character

  try {
    character = await Character.findOne({
      where: { AccountID, Name },
      attributes: ['Name', 'PkCount', 'PkLevel', 'PkTime', 'Money']
    })
  } catch (error) {
    logger.error(error)
  }

  if (!character) {
    return res.status(404).json({ error: "This Character could'nt be found" })
  }

  // Check if character is PK
  if (!(character.PkCount > 0)) {
    return res.json({
      error: `You are not murderer, ${character.Name}.`
    })
  }

  // Stats adder cost check
  const pkCost =
    pkConfig.mode === 1 ? pkConfig.cost : pkConfig.cost * character.PkCount
  if (character.Money < pkCost) {
    return res.json({
      error: `You need ${pkCost} zen to clear your ${character.PkCount} kills, ${character.Name}.`
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
}