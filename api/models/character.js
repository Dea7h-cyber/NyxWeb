const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Character = sequelize.define('Character', {
  // Name: {
  //   type: Sequelize.STRING
  // },
  // Resets: {
  //   type: Sequelize.INTEGER
  // }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = Character;