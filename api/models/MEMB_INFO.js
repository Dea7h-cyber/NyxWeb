module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'MEMB_INFO',
    {
      memb___id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      memb__pwd: {
        type: DataTypes.STRING
      },
      memb_name: {
        type: DataTypes.STRING
      },
      sno__numb: {
        type: DataTypes.STRING
      },
      phon_numb: {
        type: DataTypes.STRING
      },
      mail_addr: {
        type: DataTypes.STRING
      },
      bloc_code: {
        type: DataTypes.INTEGER
      },
      ctl1_code: {
        type: DataTypes.INTEGER
      },
      // IsVip: {
      //   type: DataTypes.INTEGER
      // },
      // VipExpirationTime: {
      //   type: DataTypes.INTEGER
      // },
      addr_info: {
        type: DataTypes.STRING
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  )
