const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

const AccountCharacter = sequelize.define(
  'AccountCharacter',
  {
    Id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    GameIDC: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

// AccountCharacter.removeAttribute('id')

module.exports = AccountCharacter
