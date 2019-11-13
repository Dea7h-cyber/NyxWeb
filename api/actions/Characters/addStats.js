/**
 * Stats adder function
 */

const logger = require('../Logger')

// Models
const Character = require('../../models/Character')

// Configs
const statsConfig = require('../../config/characters/addStats')

// Helper functions
const characterStatus = require('./status')

module.exports = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.json({
      error: errors.array()[0].msg
    })
  }

  const AccountID = req.cookies.nyx_user
  const Name = req.params.name

  const Strength = Number(req.body.Strength)
  const Dexterity = Number(req.body.Dexterity)
  const Vitality = Number(req.body.Vitality)
  const Energy = Number(req.body.Energy)
  const Leadership = Number(req.body.Leadership)

  const addStatsSum = Strength + Dexterity + Vitality + Energy + Leadership

  // Check for character status
  if (await characterStatus(AccountID, Name)) {
    return res.json({
      error: `${Name} make sure you are offline and try again.`
    })
  }

  // Check if the sum is not more than 0
  if (!(addStatsSum > 0)) {
    return res.json({
      error: `You cannot add 0 points.`
    })
  }

  try {
    const character = await Character.findOne({
      where: { AccountID, Name },
      attributes: [
        'Class',
        'Money',
        'LevelUpPoint',
        'Strength',
        'Dexterity',
        'Vitality',
        'Energy',
        'Leadership'
      ]
    })

    if (!character) {
      return res.status(404).json({ error: "This Character could'nt be found" })
    }

    // Check for available stats
    if (character.LevelUpPoint < addStatsSum) {
      return res.json({
        error: `You don't have that much points. You are ${addStatsSum -
          character.LevelUpPoint} points short.`
      })
    }

    // Check for max stats
    if (character.Strength + Strength > statsConfig.maxStats) {
      return res.json({
        error: `Your Strength cannot be more than ${statsConfig.maxStats}.`
      })
    }

    if (character.Dexterity + Dexterity > statsConfig.maxStats) {
      return res.json({
        error: `Your Agility cannot be more than ${statsConfig.maxStats}.`
      })
    }

    if (character.Vitality + Vitality > statsConfig.maxStats) {
      return res.json({
        error: `Your Vitality cannot be more than ${statsConfig.maxStats}.`
      })
    }

    if (character.Energy + Energy > statsConfig.maxStats) {
      return res.json({
        error: `Your Energy cannot be more than ${statsConfig.maxStats}.`
      })
    }

    if (character.Leadership + Leadership > statsConfig.maxStats) {
      return res.json({
        error: `Your Command cannot be more than ${statsConfig.maxStats}.`
      })
    }

    // Stats adder cost check
    if (character.Money < statsConfig.cost) {
      return res.json({
        error: `Stats adder costs ${statsConfig.cost} zen.`
      })
    }

    // Add stats
    character.Strength += Strength
    character.Dexterity += Dexterity
    character.Vitality += Vitality
    character.Energy += Energy
    character.Leadership += Leadership

    // Remove LevelUpPoints and zen if cost is enabled
    character.Money -= statsConfig.cost
    character.LevelUpPoint -= addStatsSum

    // Perform a character update
    character.save()

    res.json({
      message: `Greetings ${Name}! Your stats was successfully updated and you have ${character.LevelUpPoint} points left to add.`
    })
  } catch (error) {
    logger.error(`${error.name}: ${error.message}`)
    res.json({
      error: 'Something went wrong. Please try again later.'
    })
  }
}
