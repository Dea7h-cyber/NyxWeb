const bcrypt = require('bcrypt')
const logger = require('./Logger')

// Models
const models = require('../models/')

module.exports = async (req, res, next) => {
  const { nyx_username, nyx_token } = req.cookies

  try {
    const user = await models.MEMB_INFO.findOne({
      where: {
        memb___id: nyx_username ? nyx_username : ''
      },
      attributes: ['memb__pwd']
    })

    const passCheck = bcrypt.compareSync(user.memb__pwd, nyx_token)

    if (!user || !passCheck) {
      return res.json({ error: 'Not authorized' })
    }

    next()
  } catch (error) {
    logger.error(`${error.name}: ${error.message}`)
    res.json({
      error: 'Something went wrong. Please try again later.'
    })
  }
}
