const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Member = sequelize.define('MEMB_INFO', {
  memb___id: {
    type: Sequelize.STRING
  },
  memb__pwd: {
    type: Sequelize.STRING
  },
  memb_guid: {
    primaryKey: true,
    type: Sequelize.INTEGER
  }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = Member;