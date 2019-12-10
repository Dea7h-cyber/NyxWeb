/**
 * Character status check
 */

const logger = require('../Logger')

const membStatus = require('../Users/status')

// Models
const models = require('../../models/')

module.exports = async (account, character) => {
  try {
    if (await membStatus(account)) {
      console.log('account on')
      return false
    }

    const accountStatus = await membStatus(account)
    const accountCharacter = await models.AccountCharacter.count({
      where: {
        Id: account,
        GameIDC: character
      }
    })

    return accountStatus && accountCharacter > 0 ? true : false
  } catch (error) {
    logger.error(`${error.name}: ${error.message}`)
  }

  return true
}
