const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

const Character = sequelize.define(
  'Character',
  {
    Name: {
      type: Sequelize.STRING
    },
    Resets: {
      type: Sequelize.INTEGER
    },
    Class: {
      type: Sequelize.INTEGER
    },
    cLevel: {
      type: Sequelize.INTEGER
    },
    LevelUpPoint: {
      type: Sequelize.INTEGER
    },
    Strength: {
      type: Sequelize.INTEGER
    },
    Dexterity: {
      type: Sequelize.INTEGER
    },
    Vitality: {
      type: Sequelize.INTEGER
    },
    Energy: {
      type: Sequelize.INTEGER
    },
    Leadership: {
      type: Sequelize.INTEGER
    },
    Money: {
      type: Sequelize.INTEGER
    },
    Experience: {
      type: Sequelize.INTEGER
    },
    Inventory: {
      type: Sequelize.STRING.BINARY
    },
    PkCount: {
      type: Sequelize.INTEGER
    },
    PkLevel: {
      type: Sequelize.INTEGER
    },
    PkTime: {
      type: Sequelize.INTEGER
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

Character.removeAttribute('id')

module.exports = Character
