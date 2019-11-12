/**
 * Get a single character
 */

const logger = require('../Logger')

// Models
const Character = require('../../models/Character')

module.exports = async (req, res) => {
  try {
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
      ],
      order: [['Name', 'ASC']]
    })

    if (character) {
      res.json({ data: character })
    } else {
      res.json({ error: 'Character with this name could not be found' })
    }
  } catch (error) {
    logger.error(error)
    res.json({
      error: 'Something went wrong. Please try again later.'
    })
  }
}
