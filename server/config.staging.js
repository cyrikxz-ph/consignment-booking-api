'use strict';

module.exports = {
  restApiRoot: '/api',
  host: process.env.HOST_ADDRESS,
  port: process.env.HOST_PORT,
  remoting: {
    context: false,
    rest: {
      handleErrors: false,
      normalizeHttpPath: false,
      xml: false,
    },
    json: {
      strict: false,
      limit: '100kb',
    },
    urlencoded: {
      extended: true,
      limit: '100kb',
    },
    cors: false,
  },
};
