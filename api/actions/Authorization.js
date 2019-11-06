const User = require('../models/user')
const logger = require('./Logger')

module.exports = async (req, res, next) => {
  const { nyx_user, nyx_token } = req.cookies
  let user

  try {
    user = await User.findOne({
      where: {
        memb___id: nyx_user ? nyx_user : '',
        memb__pwd: nyx_token ? nyx_token : ''
      }
    })
  } catch (error) {
    logger.error(error)
  }

  if (user) {
    next()
  } else {
    return res.status(400).json({ error: 'Not authorized' })
  }
}
