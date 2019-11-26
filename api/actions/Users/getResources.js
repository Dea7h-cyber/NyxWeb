/**
 * Authentication/Login
 */
const logger = require('../Logger')

// Models
const models = require('../../models/')

module.exports = async (req, res) => {
  const username = req.username

  // Check if username and password match
  try {
    let resources

    resources = await models.NYX_RESOURCES.findOne({
      where: { username }
    })

    if (!resources) {
      const newRecord = await models.NYX_RESOURCES.build({
        username: req.username
      })

      await newRecord.save()

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
