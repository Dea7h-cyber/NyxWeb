/**
 * Account status check
 */

const logger = require('../Logger')

// Models
const MEMB_STAT = require('../../models/MEMB_STAT')

module.exports = async account => {
  try {
    const membStatus = await MEMB_STAT.findOne({
      where: {
        memb___id: account
      }
    })

    return membStatus && membStatus.ConnectStat === 0 ? false : true
  } catch (error) {
    logger.error(error)
  }

  return true
}
