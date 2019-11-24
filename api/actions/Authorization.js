const jsonToken = require('jsonwebtoken')
const jsonTokenSecret = require('../config/jwtKey').key

const logger = require('./Logger')

module.exports = async (req, res, next) => {
  const token = req.header('nyxAuthToken')

  if (!token) {
    return res.json({ error: 'Not authorized.' })
  }

  try {
    const decoded = jsonToken.verify(token, jsonTokenSecret)

    req.username = decoded.username
    next()
  } catch (error) {
    logger.error(`${error.name}: ${error.message}`)
    res.json({
      error: 'Token has expired. Please re-login.'
    })
  }
}
