const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

module.exports = {
  Sequelize,
  sequelize,

  AccountCharacter: require('./AccountCharacter')(sequelize, Sequelize),
  Character: require('./Character')(sequelize, Sequelize),
  MEMB_INFO: require('./MEMB_INFO')(sequelize, Sequelize),
  MEMB_STAT: require('./MEMB_STAT')(sequelize, Sequelize)
}
