/**
 * Get a list of characters
 */

const sequelize = require('sequelize')
const logger = require('../Logger')

// Models
const models = require('../../models/')

module.exports = async (req, res) => {
  const Character = models.Character()
  // const GuildMember = models.GuildMember()

  try {
    const AccountCharacter = await models.AccountCharacter.findOne({
      where: { Id: req.username },
      raw: true
    })

    const char1 = AccountCharacter.GameID1
      ? await Character.findOne({
          where: { Name: AccountCharacter.GameID1 },
          raw: true
        })
      : null

    const char2 = AccountCharacter.GameID2
      ? await Character.findOne({
          where: { Name: AccountCharacter.GameID2 },
          raw: true
        })
      : null

    const char3 = AccountCharacter.GameID3
      ? await Character.findOne({
          where: { Name: AccountCharacter.GameID3 },
          raw: true
        })
      : null

    const char4 = AccountCharacter.GameID4
      ? await Character.findOne({
          where: { Name: AccountCharacter.GameID4 },
          raw: true
        })
      : null

    const char5 = AccountCharacter.GameID5
      ? await Character.findOne({
          where: { Name: AccountCharacter.GameID5 },
          raw: true
        })
      : null

    const status = await models.MEMB_STAT.count({
      where: { memb___id: req.username, ConnectStat: 1 }
    })

    // Character Status
    if (status > 0) {
      if (char1 && AccountCharacter.GameIDC === char1.Name) char1.status = true
      if (char2 && AccountCharacter.GameIDC === char2.Name) char2.status = true
      if (char3 && AccountCharacter.GameIDC === char3.Name) char3.status = true
      if (char4 && AccountCharacter.GameIDC === char4.Name) char4.status = true
      if (char5 && AccountCharacter.GameIDC === char5.Name) char5.status = true
    }

    res.json({ data: { char1, char2, char3, char4, char5 } })
  } catch (error) {
    logger.error(`${error.name}: ${error.message}`)
    res.json({
      error: 'Something went wrong. Please try again later.'
    })
  }
}
