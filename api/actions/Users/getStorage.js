const logger = require('../Logger')
const models = require('../../models')

module.exports = async (req, res) => {
  try {
    const username = req.username

    const warehouse = await models.warehouse.findOne({
      where: { AccountID: username }
    })

    if (!warehouse) {
      // TODO create user warehouse if it doesnt exist
      return res.json({ error: 'No warehouse found for this user' })
    }

    const storage = await models.NYX_RESOURCES.findOne({
      where: { username }
    })

    if (!storage) {
      return res.json({ error: 'No storage found for this user' })
    }

    warehouse.Items = warehouse.Items.toString('hex')

    return res.json({ warehouse, storage: storage.Items })
  } catch (error) {
    logger.error(`${error.name}: ${error.message}`)
    res.json({
      error: 'Something went wrong. Please try again later.'
    })
  }
}
