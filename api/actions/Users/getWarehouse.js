/**
 * Authentication/Login
 */
const logger = require('../Logger')

// Models
const models = require('../../models/')

module.exports = async (req, res) => {
  try {
    const username = req.username

    const warehouse = await models.warehouse.findOne({
      where: { AccountID: username }
    })

    if (!warehouse) {
      return res.json({ error: 'No warehouse found for this user' })
    }

    warehouse.Items = warehouse.Items.toString('hex')

    return res.json(warehouse)
  } catch (error) {
    logger.error(`${error.name}: ${error.message}`)
    res.json({
      error: 'Something went wrong. Please try again later.'
    })
  }
}
