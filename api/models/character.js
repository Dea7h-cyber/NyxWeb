const Sequelize = require('sequelize');
const sequelize = require('../sequelize').sequelize;

module.exports = sequelize.define('Character', {
  // Name: {
  //   type: Sequelize.STRING
  // },
  // Resets: {
  //   type: Sequelize.INTEGER
  // },
  // Class: {
  //   type: Sequelize.INTEGER
  // }
}, {
  freezeTableName: true,
  timestamps: false
})
