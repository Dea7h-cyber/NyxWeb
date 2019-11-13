const bcrypt = require('bcrypt')
const MEMB_INFO = require('../models/MEMB_INFO')
const logger = require('./Logger')

module.exports = async (req, res, next) => {
  const { nyx_username, nyx_token } = req.cookies

  try {
    const user = await MEMB_INFO.findOne({
      where: {
        memb___id: nyx_username ? nyx_username : ''
      },
      attributes: ['memb__pwd']
    })

    console.log('?? ', user.memb__pwd)
    const passCheck = bcrypt.compareSync(user.memb__pwd, nyx_token)
    console.log(passCheck)

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
