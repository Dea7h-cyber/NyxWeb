/**
 * Stats adder function
 */

const logger = require('../Logger');

// Models
const Character = require('../../models/character');

// Configs
const statsConfig = require('../../config/characters/addStats');

module.exports = async (req, res) => {
  const AccountID = req.cookies.nyx_user;
  const Name = req.params.name;
  const { Strength, Dexterity, Vitality, Energy, Leadership } = req.body;
  const addStatsSum = Strength + Dexterity + Vitality + Energy + Leadership;

  let character;

  try {
    character = await Character.findOne({
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
    });
  } catch (error) {
    logger.error(error);
  }

  if (!character) {
    return res.status(404).json({ error: "This Character could'nt be found" });
  }

  // Check for available stats
  if (character.LevelUpPoint < addStatsSum) {
    return res.json({
      error: `You don't have that much points. You are ${addStatsSum -
        character.LevelUpPoint} points short.`
    });
  }

  // Check for max stats
  if (character.Strength + Strength > statsConfig.maxStats) {
    return res.json({
      error: `Your Strength cannot be more than ${statsConfig.maxStats}.`
    });
  }

  if (character.Dexterity + Dexterity > statsConfig.maxStats) {
    return res.json({
      error: `Your Agility cannot be more than ${statsConfig.maxStats}.`
    });
  }

  if (character.Vitality + Vitality > statsConfig.maxStats) {
    return res.json({
      error: `Your Vitality cannot be more than ${statsConfig.maxStats}.`
    });
  }

  if (character.Energy + Energy > statsConfig.maxStats) {
    return res.json({
      error: `Your Energy cannot be more than ${statsConfig.maxStats}.`
    });
  }

  if (character.Leadership + Leadership > statsConfig.maxStats) {
    return res.json({
      error: `Your Command cannot be more than ${statsConfig.maxStats}.`
    });
  }

  // Stats adder cost check
  if (character.Money < statsConfig.cost) {
    return res.json({
      error: `Stats adder costs ${statsConfig.cost} zen.`
    });
  }

  // Add stats
  character.Strength += Strength;
  character.Dexterity += Dexterity;
  character.Vitality += Vitality;
  character.Energy += Energy;
  character.Leadership += Leadership;

  // Remove LevelUpPoints and zen if cost is enabled
  character.Money -= statsConfig.cost;
  character.LevelUpPoint -= addStatsSum;

  // Perform a character update
  character.save();

  res.json({
    message: `Greetings ${Name}! Your stats was successfully updated and you have ${character.LevelUpPoint -
      addStatsSum} points left to add.`
  });
};
