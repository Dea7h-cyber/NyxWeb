module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'AccountCharacter',
    {
      Id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      GameIDC: {
        type: DataTypes.STRING
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  )
