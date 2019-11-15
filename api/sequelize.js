const db = require('./config/db.json')
const Sequelize = require('sequelize')

module.exports = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  port: db.port, // 60143
  dialect: db.dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
