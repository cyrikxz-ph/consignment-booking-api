'use strict';

module.exports = function(State) {
  State.disableRemoteMethodByName('prototype.__findById__postCodes');
  // State.disableRemoteMethodByName('prototype.__count__postCodes');
  State.disableRemoteMethodByName('prototype.__create__postCodes');
  State.disableRemoteMethodByName('prototype.__delete__postCodes');
  State.disableRemoteMethodByName('prototype.__destroyById__postCodes');
  State.disableRemoteMethodByName('prototype.__findById__postCodes');
  // State.disableRemoteMethodByName('prototype.__get__postCodes');
  State.disableRemoteMethodByName('prototype.__updateById__postCodes');

  // State.disableRemoteMethodByName('prototype.updateAttributes');
  // State.disableRemoteMethodByName('prototype.patchAttributes');
  // State.disableRemoteMethodByName('create');
  State.disableRemoteMethodByName('destroyById');
  // State.disableRemoteMethodByName('find');
  // State.disableRemoteMethodByName('findById');
  // State.disableRemoteMethodByName('count');
  State.disableRemoteMethodByName('createUpdates');
  State.disableRemoteMethodByName('replaceById');
  State.disableRemoteMethodByName('upsert');
  State.disableRemoteMethodByName('updateAll');
  State.disableRemoteMethodByName('findOne');
  State.disableRemoteMethodByName('confirm');
  State.disableRemoteMethodByName('exists');
  State.disableRemoteMethodByName('replace');
  State.disableRemoteMethodByName('createChangeStream');
  State.disableRemoteMethodByName('replaceOrCreate');
  State.disableRemoteMethodByName('upsertWithWhere');
};
