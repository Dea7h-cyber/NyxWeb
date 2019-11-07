const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

const MEMB_STAT = sequelize.define(
  'MEMB_STAT',
  {
    memb___id: {
      type: Sequelize.STRING
    },
    ConnectStat: {
      type: Sequelize.INTEGER
    },
    ConnectTM: {
      type: Sequelize.STRING
    },
    DisConnectTM: {
      type: Sequelize.STRING
    },
    TotalTime: {
      type: Sequelize.INTEGER
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

MEMB_STAT.removeAttribute('id')

module.exports = MEMB_STAT
