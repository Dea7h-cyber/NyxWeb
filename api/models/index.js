const DataTypes = require('sequelize')
const sequelize = require('../sequelize')

module.exports = {
  AccountCharacter: require('./AccountCharacter')(sequelize, DataTypes),
  Character: require('./Character'),
  MEMB_INFO: require('./MEMB_INFO')(sequelize, DataTypes),
  MEMB_STAT: require('./MEMB_STAT')(sequelize, DataTypes),
  Guild: require('./Guild')(sequelize, DataTypes),
  GuildMember: require('./GuildMember'),
  NYX_RESOURCES: require('./NYX_RESOURCES')(sequelize, DataTypes)
}
