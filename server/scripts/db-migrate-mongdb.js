'use strict';

var server = require('../server');
var ds = server.dataSources.mongoDS;
var lbTables = [
  'state',
  'postCode',
  'suburb',
  'user',
  'AccessToken',
  'ACL',
  'RoleMapping',
  'Role',
];

ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' - lbTables - '] created in ',
    ds.adapter.name);
  ds.disconnect();
});
