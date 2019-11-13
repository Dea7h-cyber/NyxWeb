/**
 * User Registration function
 */

const { validationResult } = require('express-validator')

const logger = require('../Logger')

// Models
const MEMB_INFO = require('../../models/MEMB_INFO')

module.exports = async (req, res) => {
  const errors = validationResult(req)
  console.log(errors)
  if (!errors.isEmpty()) {
    return res.json({
      error: errors.array()[0].msg
    })
  }

  const { username, password, email } = req.body

  try {
    const usernameCheck = await MEMB_INFO.count({
      where: {
        memb___id: username
      }
    })

    if (usernameCheck > 0) {
      return res.json({ error: 'This username is already taken.' })
    }

    const emailCheck = await MEMB_INFO.count({
      where: {
        mail_addr: email
      }
    })

    if (emailCheck > 0) {
      return res.json({ error: 'This E-Mail adress is already taken.' })
    }

    const newRecord = await MEMB_INFO.build({
      memb___id: username,
      memb_name: username,
      memb__pwd: password,
      phon_numb: Date.now().toString(),
      sno__numb: 'Unknown',
      mail_addr: email,
      bloc_code: 0,
      ctl1_code: 0,
      // IsVip: 0,
      // VipExpirationTime: 0,
      addr_info: req.ip
    })

    await newRecord.save()

    res.json({
      message: `Greetings ${username}! Your Account was successfully created!`
    })
  } catch (error) {
    logger.error(`${error.name}: ${error.message}`)
    res.json({
      error: 'Something went wrong. Please try again later.'
    })
  }
}
