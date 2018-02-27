'use strict';
const _ = require('lodash');

module.exports = function(User) {
  const app = require('../../server/server');

  User.disableRemoteMethodByName('prototype.__findById__companies');
  User.disableRemoteMethodByName('prototype.__count__companies');
  User.disableRemoteMethodByName('prototype.__create__companies');
  User.disableRemoteMethodByName('prototype.__delete__companies');
  User.disableRemoteMethodByName('prototype.__destroyById__companies');
  User.disableRemoteMethodByName('prototype.__findById__companies');
  User.disableRemoteMethodByName('prototype.__get__companies');
  User.disableRemoteMethodByName('prototype.__updateById__companies');
  User.disableRemoteMethodByName('prototype.__link__companies');
  User.disableRemoteMethodByName('prototype.___unlink__companies');

  User.disableRemoteMethodByName('prototype.__findById__accessTokens');
  User.disableRemoteMethodByName('prototype.__count__accessTokens');
  User.disableRemoteMethodByName('prototype.__create__accessTokens');
  User.disableRemoteMethodByName('prototype.__delete__accessTokens');
  User.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
  User.disableRemoteMethodByName('prototype.__findById__accessTokens');
  User.disableRemoteMethodByName('prototype.__get__accessTokens');
  User.disableRemoteMethodByName('prototype.__updateById__accessTokens');
  // User.disableRemoteMethodByName('prototype.updateAttributes');
  // User.disableRemoteMethodByName('prototype.patchAttributes');
  // User.disableRemoteMethodByName('create');
  User.disableRemoteMethodByName('destroyById');
  // User.disableRemoteMethodByName('find');
  // User.disableRemoteMethodByName('findById');
  // User.disableRemoteMethodByName('count');
  User.disableRemoteMethodByName('replaceById');
  User.disableRemoteMethodByName('upsert');
  User.disableRemoteMethodByName('updateAll');
  User.disableRemoteMethodByName('findOne');
  User.disableRemoteMethodByName('confirm');
  User.disableRemoteMethodByName('exists');
  User.disableRemoteMethodByName('replace');
  User.disableRemoteMethodByName('createChangeStream');
  User.disableRemoteMethodByName('replaceOrCreate');
  User.disableRemoteMethodByName('upsertWithWhere');

  // User.observe('access', function logQuery(ctx, next) {
  //   console.log('Accessing %s matching %s', ctx.Model.modelName, ctx.query.where);
  //   next();
  // });

  User.statusCheck = function(callback) {
    var status = 'ok';
    // TODO
    callback(null, status);
  };

  User.afterRemote('*', function(ctx, results, next) {
    const Role = app.models.Role;
    const Company = app.models.Company;

    var getUserReturnProperties = function(user) {
      return new Promise(function(resolve, reject) {
        Company.findById(user.companyId)
          .then(function(company) {
            if (company) {
              user.company = {
                id: company.id,
                name: company.name,
              };
            } else {
              user.company = [];
            }
            // user.unsetAttribute('companyId');
            resolve(user);
          })
          .catch(function(e) {
            user.company = [];
          });
      });
    };

    if (results && (ctx.resultType === 'user' ||
          _.includes(ctx.resultType, 'user'))) {
      if (Array.isArray(ctx.result)) {
        var users = results;
        Promise.all(users.map(function(user) {
          return getUserReturnProperties(user);
        }))
        .then(function(user) {
          next();
        })
        .catch(function(e) {
          console.error(e);
        });
      } else {
        getUserReturnProperties(results)
          .then(function(user) {
            next();
          });
      }
    } else {
      next();
    }
  });
};
