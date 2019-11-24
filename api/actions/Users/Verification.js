const jsonToken = require('jsonwebtoken')
const jsonTokenSecret = require('../../config/jwtKey').key

const logger = require('../Logger')

module.exports = async (req, res) => {
  const token = req.header('nyxAuthToken')

  if (!token) {
    return res.json({ error: 'Not authorized.' })
  }

  try {
    jsonToken.verify(token, jsonTokenSecret)
    return res.json({ message: 'Your token is valid.' })
  } catch (error) {
    logger.error(`${error.name}: ${error.message}`)
    res.json({
      error: 'Your token has expired. Please re-login.'
    })
  }
}
