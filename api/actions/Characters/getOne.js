/**
 * Get a single character
 */

const logger = require('../Logger')

// Models
const Character = require('../../models/Character')

module.exports = async (req, res) => {
  const character = await Character.findOne({
    where: { Name: req.params.name },
    attributes: [
      'Inventory',
      'Class',
      'cLevel',
      'Resets',
      'Money',
      'LevelUpPoint',
      'Experience'
    ]
  })

  if (character) {
    res.status(200).json({ data: character })
  } else {
    logger.error(error)
    res.json({
      error: 'Something went wrong. Please try again later.'
    })
  }
}
