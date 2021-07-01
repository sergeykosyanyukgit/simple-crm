const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize(process.env.MYSQL_DB_NAME, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_DB_ADDR,
  dialect: 'mysql',
  define: {
    freezeTableName: true
  },
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

require('../models')(sequelize, DataTypes)

try {
  sequelize.authenticate()
  sequelize.sync()
  console.log('Connection, sync has been established successfully.');
} catch (error) {
  console.error('Unable to connect or sync to the database:', error);
}

module.exports = sequelize