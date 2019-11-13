const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

const MEMB_INFO = sequelize.define(
  'MEMB_INFO',
  {
    memb___id: {
      type: Sequelize.STRING
    },
    memb__pwd: {
      type: Sequelize.STRING
    },
    memb_name: {
      type: Sequelize.STRING
    },
    sno__numb: {
      type: Sequelize.STRING
    },
    phon_numb: {
      type: Sequelize.STRING
    },
    mail_addr: {
      type: Sequelize.STRING
    },
    bloc_code: {
      type: Sequelize.INTEGER
    },
    ctl1_code: {
      type: Sequelize.INTEGER
    },
    // IsVip: {
    //   type: Sequelize.INTEGER
    // },
    // VipExpirationTime: {
    //   type: Sequelize.INTEGER
    // },
    addr_info: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

// MEMB_INFO.removeAttribute('id')

module.exports = MEMB_INFO
