/**
 * Authentication/Login
 */
const { validationResult } = require('express-validator')
const jsonToken = require('jsonwebtoken')
const jsonTokenSecret = require('../../config/jwtKey').key

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

    jsonToken.sign(
      { username },
      jsonTokenSecret,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err

        res.json({
          message: `You logged in successfully ${username}!`,
          token
        })
      }
    )
  } catch (error) {
    logger.error(`${error.name}: ${error.message}`)
    res.json({
      error: 'Something went wrong. Please try again later.'
    })
  }
}
