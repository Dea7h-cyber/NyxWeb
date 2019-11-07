/**
 * Get a list of characters
 */

// Models
const Character = require('../../models/Character')

// Configs
const rankingsConfig = require('../../config/characters/rankings')

module.exports = async (req, res) => {
  let page = 1,
    offset,
    next,
    prev

  // Pagination
  if (req.query.page && isFinite(req.query.page)) {
    page = Number(req.query.page)
    delete req.query.page
  }

  offset = (page - 1) * rankingsConfig.perPage
  // End Pagination

  try {
    const characters = await Character.findAll({
      offset,
      limit: rankingsConfig.perPage,
      where: req.query,
      order: [['Resets', 'DESC'], ['Name', 'ASC']],
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

    // Passing in next and previous page numbers
    next = page + 1
    prev = page - 1 > 0 ? page - 1 : null

    res.status(200).json({ next, prev, data: characters })
  } catch (error) {
    res.status(404).json({ error: 'Invalid request' })
  }
}
