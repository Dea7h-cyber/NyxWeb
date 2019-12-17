/**
 * Authentication/Login
 */
const logger = require('../Logger')

// Models
const models = require('../../models/')

module.exports = async (req, res) => {
  try {
    const username = req.username
    let resources = await models.NYX_RESOURCES.findOne({
      where: { username }
    })

    if (!resources) {
      const newRecord = await models.NYX_RESOURCES.build({
        username: req.username
      })

      await newRecord.save()

      // TODO get this out of this if cuz it might not work? :]
      resources = await models.NYX_RESOURCES.findOne({
        where: { username }
      })
    }

    return res.json(resources)
  } catch (error) {
    logger.error(`${error.name}: ${error.message}`)
    res.json({
      error: 'Something went wrong. Please try again later.'
    })
  }
}
