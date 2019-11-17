module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'Guild',
    {
      G_Name: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      G_Mark: {
        type: DataTypes.STRING.BINARY
      },
      G_Score: {
        type: DataTypes.INTEGER
      },
      G_Master: {
        type: DataTypes.STRING
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  )
