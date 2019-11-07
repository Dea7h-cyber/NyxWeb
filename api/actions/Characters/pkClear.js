/**
 * PK Clear function
 */

/**
 * !TODO: Check for character status :]
 */

const logger = require('../Logger');

// Models
const Character = require('../../models/character');

// Configs
const pkConfig = require('../../config/characters/pkClear');

module.exports = async (req, res) => {
  const AccountID = req.cookies.nyx_user;
  const Name = req.params.name;

  let character;

  try {
    character = await Character.findOne({
      where: { AccountID, Name },
      attributes: ['Name', 'PkCount', 'Money']
    });
  } catch (error) {
    logger.error(error);
  }

  if (!character) {
    return res.status(404).json({ error: "This Character could'nt be found" });
  }

  // Stats adder cost check
  const pkCost =
    pkConfig.mode === 1 ? pkConfig.cost : pkConfig.cost * character.PkCount;
  if (character.Money < pkCost) {
    return res.json({
      error: `You need ${pkCost} zen to clear your ${character.PkCount} kills, ${character.Name}.`
    });
  }

  // Clear kills and get cost
  character.PkCount = 0;
  character.Money -= pkCost;

  // Perform a character update
  character.save();

  res.json({
    message: `Greetings ${Name}! Your kills were successfully cleared!`
  });
};
