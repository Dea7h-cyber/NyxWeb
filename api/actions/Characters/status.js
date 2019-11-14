/**
 * Character status check
 */

const logger = require('../Logger')

const membStatus = require('../Users/status')

// Models
const models = require('../../models/')

module.exports = async (account, character) => {
  try {
    const accountStatus = membStatus(account)

    if (!accountStatus) {
      return false
    }

    const accountCharacter = await models.AccountCharacter.count({
      where: {
        Id: account,
        GameIDC: character
      }
    })

    return accountCharacter > 0 ? true : false
  } catch (error) {
    logger.error(`${error.name}: ${error.message}`)
  }

  return true
}
