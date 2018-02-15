'use strict';

module.exports = {
  mysqlDS: {
    connector: 'mongodb',
    hostname: process.env.DB_HOSTNAME,
    url: '',
    port: process.env.DB_PORT || 27017,
    user: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DBNAME,
  },
};
