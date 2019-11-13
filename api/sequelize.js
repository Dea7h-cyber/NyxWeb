const Sequelize = require('sequelize')

module.exports = new Sequelize('MuOnline', 'sa', 'thepasswordis1', {
  host: 'localhost',
  port: 60143, // 1414
  dialect: 'mssql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
