/**
 * Stats adder function
 */

const logger = require('../Logger')

// Models
const AccountCharacter = require('../../models/AccountCharacter')
const MEMB_STAT = require('../../models/MEMB_STAT')

module.exports = async (account, character) => {
  try {
    let status = 1

    const accountChar = await AccountCharacter.count({
      where: {
        Id: account,
        GameIDC: character
      }
    })

    if (accountChar > 0) {
      const membStat = await MEMB_STAT.count({
        where: {
          memb___id: account,
          ConnectStat: 1
        }
      })

      if (membStat > 0) {
        status = 2
      }
    }

    return status
  } catch (error) {
    logger.error(error)
  }

  return 666
}
