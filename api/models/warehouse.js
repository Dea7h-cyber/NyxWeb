module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'warehouse',
    {
      AccountID: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      Items: {
        type: DataTypes.STRING.BINARY
      },
      Money: {
        type: DataTypes.INTEGER
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  )
