const fs = require('fs');
const config = require('../config/config');

module.exports = {
  development: {
    username: config.db.username,
    password: config.db.password,
    database: config.db.dbname,
    host: config.db.host,
    dialect: config.db.dialect,
    logging:config.db.logging
  },
  test: {
    username: config.db.username,
    password: config.db.password,
    database: config.db.dbname,
    host: config.db.host,
    dialect: config.db.dialect,
    logging:config.db.logging
  },
  production: {
    username: config.db.username,
    password: config.db.password,
    database: config.db.dbname,
    host: config.db.host,
    dialect: config.db.dialect,
    logging:config.db.logging
  }
};