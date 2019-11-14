module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'MEMB_STAT',
    {
      memb___id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      ConnectStat: {
        type: DataTypes.INTEGER
      },
      ConnectTM: {
        type: DataTypes.STRING
      },
      DisConnectTM: {
        type: DataTypes.STRING
      },
      TotalTime: {
        type: DataTypes.INTEGER
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  )
