module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'AccountCharacter',
    {
      Id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      GameID1: {
        type: DataTypes.STRING
      },
      GameID2: {
        type: DataTypes.STRING
      },
      GameID3: {
        type: DataTypes.STRING
      },
      GameID4: {
        type: DataTypes.STRING
      },
      GameID5: {
        type: DataTypes.STRING
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
