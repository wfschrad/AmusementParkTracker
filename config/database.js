const {username, password, database, host} = require('./index.js').db;

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres'
  }
}