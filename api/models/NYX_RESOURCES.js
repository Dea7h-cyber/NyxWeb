module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'NYX_RESOURCES',
    {
      username: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      zen: {
        type: DataTypes.INTEGER
      },
      credits: {
        type: DataTypes.INTEGER
      },
      chaos: {
        type: DataTypes.INTEGER
      },
      bless: {
        type: DataTypes.INTEGER
      },
      soul: {
        type: DataTypes.INTEGER
      },
      life: {
        type: DataTypes.INTEGER
      },
      creation: {
        type: DataTypes.INTEGER
      },
      guardian: {
        type: DataTypes.INTEGER
      },
      stone: {
        type: DataTypes.INTEGER
      },
      rena: {
        type: DataTypes.INTEGER
      },
      signoflord: {
        type: DataTypes.INTEGER
      },
      boh: {
        type: DataTypes.INTEGER
      },
      bol: {
        type: DataTypes.INTEGER
      },
      bok1: {
        type: DataTypes.INTEGER
      },
      bok2: {
        type: DataTypes.INTEGER
      },
      bok3: {
        type: DataTypes.INTEGER
      },
      bok4: {
        type: DataTypes.INTEGER
      },
      bok5: {
        type: DataTypes.INTEGER
      },
      feather: {
        type: DataTypes.INTEGER
      },
      crest: {
        type: DataTypes.INTEGER
      },
      unilia: {
        type: DataTypes.INTEGER
      },
      dinorat: {
        type: DataTypes.INTEGER
      },
      satan: {
        type: DataTypes.INTEGER
      },
      angel: {
        type: DataTypes.INTEGER
      },
      questNumber: {
        type: DataTypes.INTEGER
      },
      questItems: {
        type: DataTypes.INTEGER
      },
      Items: {
        type: DataTypes.STRING
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  )
