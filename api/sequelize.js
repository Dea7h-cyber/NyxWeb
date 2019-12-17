require('dotenv').config()
const db = require('./config/db.json')
const Sequelize = require('sequelize')

module.exports = new Sequelize(
  db.database,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: db.dialect,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
)
