module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'Character',
    {
      AccountID: {
        type: DataTypes.STRING
      },
      Name: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      Resets: {
        type: DataTypes.INTEGER
      },
      Class: {
        type: DataTypes.INTEGER
      },
      cLevel: {
        type: DataTypes.INTEGER
      },
      LevelUpPoint: {
        type: DataTypes.INTEGER
      },
      Strength: {
        type: DataTypes.INTEGER
      },
      Dexterity: {
        type: DataTypes.INTEGER
      },
      Vitality: {
        type: DataTypes.INTEGER
      },
      Energy: {
        type: DataTypes.INTEGER
      },
      Leadership: {
        type: DataTypes.INTEGER
      },
      Money: {
        type: DataTypes.INTEGER
      },
      Experience: {
        type: DataTypes.INTEGER
      },
      Inventory: {
        type: DataTypes.STRING.BINARY
      },
      PkCount: {
        type: DataTypes.INTEGER
      },
      PkLevel: {
        type: DataTypes.INTEGER
      },
      PkTime: {
        type: DataTypes.INTEGER
      },
      QuestNumber: {
        type: DataTypes.INTEGER
      },
      SkyEventWins: {
        type: DataTypes.INTEGER
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  )
