/**
 * Stats adder function
 */

const logger = require('../Logger')

// Models
const AccountCharacter = require('../../models/AccountCharacter')
const MEMB_STAT = require('../../models/MEMB_STAT')

module.exports = async (account, character) => {
  let status = false,
    accountChar,
    membStat

  try {
    accountChar = await AccountCharacter.count({
      where: {
        Id: account,
        GameIDC: character
      }
    })

    if (accountChar > 0) {
      membStat = await MEMB_STAT.count({
        where: {
          memb___id: account,
          ConnectStat: 1
        }
      })

      if (membStat > 0) {
        status = true
      }
    }

    return status
  } catch (error) {
    logger.error(error)
    res.json({
      error: 'Something went wrong. Please try again later.'
    })
  }

  return true
}
