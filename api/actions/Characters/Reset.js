/**
 * Character reset function
 */

const logger = require('../Logger')

// Models
const Character = require('../../models/Character')

// Configs
const resetConfig = require('../../config/characters/reset')

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

  try {
    const character = await Character.findOne({
      where: { AccountID, Name },
      attributes: [
        'Inventory',
        'Class',
        'cLevel',
        'Resets',
        'Money',
        'LevelUpPoint',
        'Strength',
        'Dexterity',
        'Vitality',
        'Energy',
        'Leadership',
        'Experience'
      ]
    })

    if (!character) {
      return res.status(404).json({ error: "This Character could'nt be found" })
    }

    // Check for equippment
    if (resetConfig.checkForEquipment) {
      const inventory = character.Inventory.toString('hex')
      if ('f'.repeat(240) !== inventory.substr(0, 240).toLowerCase()) {
        return res.json({
          error: `Make sure you don't wear any items and try again.`
        })
      }
    }

    // Checking for reset level
    if (
      resetConfig.levelResetType === 1 &&
      character.cLevel < resetConfig.levelReset
    ) {
      return res.json({
        error: `You need level ${resetConfig.levelReset} to reset, ${Name}`
      })
    }

    if (resetConfig.levelResetType === 2) {
      for (let reset in resetConfig.levelResetCustom) {
        if (character.Resets <= reset) {
          if (character.cLevel < resetConfig.levelResetCustom[reset]) {
            return res.json({
              error: `You need level ${resetConfig.levelResetCustom[reset]} to reset, ${Name}`
            })
          }
          break
        }
      }

      const keys = Object.keys(resetConfig.levelResetCustom)
      const lastReset = keys[keys.length - 1]
      const lastResetLevel = resetConfig.levelResetCustom[lastReset]

      if (character.Resets >= lastReset && character.cLevel < lastResetLevel) {
        return res.json({
          error: `You need level ${lastResetLevel} to reset, ${Name}`
        })
      }
    }

    // Check for zen
    const requiredZenForReset =
      resetConfig.resetCostType === 1
        ? resetConfig.resetCost
        : (character.Resets + 1) * resetConfig.resetCost
    if (character.Money < requiredZenForReset) {
      return res.json({
        error: `You need ${requiredZenForReset} zen to reset, ${Name}`
      })
    }

    // Stats calculation
    const getStatsForMe =
      (character.Resets + 1) *
      (resetConfig.statsPerClass
        ? !resetConfig.statsClasses[character.Class]
          ? resetConfig.defaultStats
          : resetConfig.statsClasses[character.Class]
        : resetConfig.defaultStats)
    if (resetConfig.statsPerResetType === 2) {
      character.LevelUpPoint += getStatsForMe
    }

    if (resetConfig.statsPerResetType === 3) {
      character.LevelUpPoint = getStatsForMe
      character.Strength = 100
      character.Dexterity = 100
      character.Vitality = 100
      character.Energy = 100
      if (
        character.Leadership &&
        resetConfig.resetCommand &&
        character.Class === 64
      ) {
        character.Leadership = 100
      }
    }

    character.cLevel = 1
    character.Resets += 1
    character.Experience = 0
    character.Money -= requiredZenForReset

    // Perform a character update
    character.save()

    res.json({
      message: `Greetings ${Name}! You successfully performed restart number ${character.Resets}.`
    })
  } catch (error) {
    logger.error(error)
    res.json({
      error: 'Something went wrong. Please try again later.'
    })
  }
}
