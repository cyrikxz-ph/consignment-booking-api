'use strict';

module.exports = function(Packagetype) {
  // Packagetype.disableRemoteMethodByName('prototype.updateAttributes');
  // Packagetype.disableRemoteMethodByName('prototype.patchAttributes');
  // Packagetype.disableRemoteMethodByName('create');
  // Packagetype.disableRemoteMethodByName('destroyById');
  // Packagetype.disableRemoteMethodByName('find');
  // Packagetype.disableRemoteMethodByName('findById');
  // Packagetype.disableRemoteMethodByName('count');
  Packagetype.disableRemoteMethodByName('replaceById');
  Packagetype.disableRemoteMethodByName('upsert');
  Packagetype.disableRemoteMethodByName('updateAll');
  Packagetype.disableRemoteMethodByName('findOne');
  Packagetype.disableRemoteMethodByName('confirm');
  Packagetype.disableRemoteMethodByName('exists');
  Packagetype.disableRemoteMethodByName('replace');
  Packagetype.disableRemoteMethodByName('createChangeStream');
  Packagetype.disableRemoteMethodByName('replaceOrCreate');
  Packagetype.disableRemoteMethodByName('upsertWithWhere');

};
