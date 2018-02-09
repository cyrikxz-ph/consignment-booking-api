'use strict';

module.exports = function(Postcode) {
  // Postcode.disableRemoteMethodByName('prototype.updateAttributes');
  // Postcode.disableRemoteMethodByName('prototype.patchAttributes');
  // Postcode.disableRemoteMethodByName('create');
  Postcode.disableRemoteMethodByName('destroyById');
  // Postcode.disableRemoteMethodByName('find');
  // Postcode.disableRemoteMethodByName('findById');
  // Postcode.disableRemoteMethodByName('count');
  Postcode.disableRemoteMethodByName('createUpdates');
  Postcode.disableRemoteMethodByName('replaceById');
  Postcode.disableRemoteMethodByName('upsert');
  Postcode.disableRemoteMethodByName('updateAll');
  Postcode.disableRemoteMethodByName('findOne');
  Postcode.disableRemoteMethodByName('confirm');
  Postcode.disableRemoteMethodByName('exists');
  Postcode.disableRemoteMethodByName('replace');
  Postcode.disableRemoteMethodByName('createChangeStream');
  Postcode.disableRemoteMethodByName('replaceOrCreate');
  Postcode.disableRemoteMethodByName('upsertWithWhere');
};
