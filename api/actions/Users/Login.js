/**
 * Authentication/Login
 */
const { validationResult } = require('express-validator')

// const bcrypt = require('bcrypt')
const logger = require('../Logger')

// Models
const models = require('../../models/')

module.exports = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.json({
      error: errors.array()[0].msg
    })
  }

  const { username, password } = req.body

  // Check if username and password match
  try {
    const check = await models.MEMB_INFO.count({
      where: {
        memb___id: username,
        memb__pwd: password
      }
    })

    if (check !== 1) {
      return res.json({ error: 'Wrong credentials.' })
    }

    // const password_hash = bcrypt.hashSync(password, 10)

    // res.cookie('nyx_username', username, {
    //   maxAge: 60000 * 60 * 24 * 30 * 12,
    //   httpOnly: true
    // })

    // res.cookie('nyx_token', password_hash, {
    //   maxAge: 60000 * 60 * 24 * 30 * 12,
    //   httpOnly: true
    // })

    res.json({
      message: `You logged in successfully ${username}!`
    })
  } catch (error) {
    logger.error(`${error.name}: ${error.message}`)
    res.json({
      error: 'Something went wrong. Please try again later.'
    })
  }
}
