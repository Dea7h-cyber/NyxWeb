/**
 * Get a single character
 */

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
    res.status(404).json({ error: 'Character not found' })
  }
}
