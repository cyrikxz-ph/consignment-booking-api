'use strict';
const _ = require('lodash');

module.exports = function(Company) {
  /* consignments relation */
  Company.disableRemoteMethodByName('prototype.__findById__consignments');
  Company.disableRemoteMethodByName('prototype.__count__consignments');
  Company.disableRemoteMethodByName('prototype.__create__consignments');
  Company.disableRemoteMethodByName('prototype.__delete__consignments');
  Company.disableRemoteMethodByName('prototype.__destroyById__consignments');
  Company.disableRemoteMethodByName('prototype.__findById__consignments');
  Company.disableRemoteMethodByName('prototype.__get__consignments');
  Company.disableRemoteMethodByName('prototype.__updateById__consignments');
  /* users relation */
  Company.disableRemoteMethodByName('prototype.__findById__users');
  Company.disableRemoteMethodByName('prototype.__count__users');
  Company.disableRemoteMethodByName('prototype.__create__users');
  Company.disableRemoteMethodByName('prototype.__delete__users');
  Company.disableRemoteMethodByName('prototype.__destroyById__users');
  Company.disableRemoteMethodByName('prototype.__findById__users');
  Company.disableRemoteMethodByName('prototype.__get__users');
  Company.disableRemoteMethodByName('prototype.__updateById__users');
  // Company.disableRemoteMethodByName('prototype.updateAttributes');
  // Company.disableRemoteMethodByName('prototype.patchAttributes');
  // Company.disableRemoteMethodByName('create');
  // Company.disableRemoteMethodByName('destroyById');
  // Company.disableRemoteMethodByName('find');
  // Company.disableRemoteMethodByName('findById');
  // Company.disableRemoteMethodByName('count');
  Company.disableRemoteMethodByName('replaceById');
  Company.disableRemoteMethodByName('upsert');
  Company.disableRemoteMethodByName('updateAll');
  Company.disableRemoteMethodByName('findOne');
  Company.disableRemoteMethodByName('confirm');
  Company.disableRemoteMethodByName('exists');
  Company.disableRemoteMethodByName('replace');
  Company.disableRemoteMethodByName('createChangeStream');
  Company.disableRemoteMethodByName('replaceOrCreate');
  Company.disableRemoteMethodByName('upsertWithWhere');

  Company.afterRemote('*', function(ctx, results, next) {
    var getCompanyReturnProperties = function(company) {
      return new Promise(function(resolve, reject) {
        if (company.parentId) {
          Company.findById(company.parentId)
          .then(function(parentCompany) {
            if (parentCompany) {
              company.parentCompany = {
                id: parentCompany.id,
                name: parentCompany.name,
              };
              company.unsetAttribute('parentId');
              resolve(company);
            } else {
              company.parentCompany = {};
              company.unsetAttribute('parentId');
              resolve(company);
            }
          });
        } else {
          company.parentCompany = {};
          company.unsetAttribute('parentId');
          resolve(company);
        }
      });
    };

    if (results && (ctx.resultType === 'company' ||
          _.includes(ctx.resultType, 'company'))) {
      if (Array.isArray(ctx.result)) {
        var comapanies = results;
        Promise.all(comapanies.map(function(comapany) {
          return getCompanyReturnProperties(comapany);
        }))
        .then(function(suburb) {
          next();
        })
        .catch(function(e) {
          console.error(e);
        });
      } else {
        getCompanyReturnProperties(results)
          .then(function(company) {
            next();
          });
      }
    } else {
      next();
    }
  });
};
