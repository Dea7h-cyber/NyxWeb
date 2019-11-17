const DataTypes = require('sequelize')
const sequelize = require('../sequelize')

module.exports = () =>
  sequelize.define(
    'GuildMember',
    {
      Name: {
        type: DataTypes.STRING
      },
      G_Name: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      G_Level: {
        type: DataTypes.INTEGER
      },
      G_Status: {
        type: DataTypes.INTEGER
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  )
