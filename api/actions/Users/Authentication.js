/**
 * Authentication/Login
 */

const logger = require('../Logger')

// Models
const MEMB_INFO = require('../../models/MEMB_INFO')

module.exports = async (req, res) => {
  const AccountID = req.cookies.nyx_user
  const Name = req.params.name

  // Check for character status
  // if (await status(AccountID, Name)) {
  //   return res.json({
  //     error: `${Name} make sure you are offline and try again.`
  //   })
  // }

  // let character

  // try {
  //   character = await Character.findOne({
  //     where: { AccountID, Name },
  //     attributes: [
  //       'Inventory',
  //       'Class',
  //       'cLevel',
  //       'Resets',
  //       'Money',
  //       'LevelUpPoint',
  //       'Strength',
  //       'Dexterity',
  //       'Vitality',
  //       'Energy',
  //       'Leadership',
  //       'Experience'
  //     ]
  //   })
  // } catch (error) {
  //   logger.error(error)
  // }

  // if (!character) {
  //   return res.status(404).json({ error: "This Character could'nt be found" })
  // }

  character.Money -= requiredZenForReset

  // Perform a character update
  character.save()

  res.json({
    message: `Greetings ${Name}! You successfully performed restart number ${character.Resets}.`
  })
}
