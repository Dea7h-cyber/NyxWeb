/**
 * Account status check
 */

const logger = require('../Logger')

// Models
const models = require('../../models/')

module.exports = async account => {
  try {
    const membStatus = await models.MEMB_STAT.findOne({
      where: {
        memb___id: account
      }
    })

    return membStatus && membStatus.ConnectStat === 0 ? false : true
  } catch (error) {
    logger.error(`${error.name}: ${error.message}`)
  }

  return true
}
