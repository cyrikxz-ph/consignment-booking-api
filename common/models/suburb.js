'use strict';
const _ = require('lodash');
var multiparty = require('multiparty');
var path = require('path');
var fs = require('fs');
var config = require('../../server/config.json');

module.exports = function(Suburb) {
  const app = require('../../server/server');

  Suburb.disableRemoteMethodByName('prototype.__create__postCode');
  Suburb.disableRemoteMethodByName('prototype.__destroy__postCode');
  Suburb.disableRemoteMethodByName('prototype.__update__postCode');
  // Suburb.disableRemoteMethodByName('prototype.__get__postCode');
  // Suburb.disableRemoteMethodByName('prototype.updateAttributes');
  // Suburb.disableRemoteMethodByName('prototype.patchAttributes');
  // Suburb.disableRemoteMethodByName('create');
  // Suburb.disableRemoteMethodByName('destroyById');
  // Suburb.disableRemoteMethodByName('find');
  // Suburb.disableRemoteMethodByName('findById');
  // Suburb.disableRemoteMethodByName('count');
  Suburb.disableRemoteMethodByName('replaceById');
  Suburb.disableRemoteMethodByName('upsert');
  Suburb.disableRemoteMethodByName('updateAll');
  Suburb.disableRemoteMethodByName('findOne');
  Suburb.disableRemoteMethodByName('confirm');
  Suburb.disableRemoteMethodByName('exists');
  Suburb.disableRemoteMethodByName('replace');
  Suburb.disableRemoteMethodByName('createChangeStream');
  Suburb.disableRemoteMethodByName('replaceOrCreate');
  Suburb.disableRemoteMethodByName('upsertWithWhere');

  Suburb.observe('before save', function(ctx, next) {
    // Validate Poll input structure on create
    const PostCode = app.models.PostCode;
    const State = app.models.State;
    if (ctx.isNewInstance) {
      if (!ctx.instance.postCode) {
        next({
          statusCode: 400,
          name: 'Bad Request',
          message: 'The `suburb` instance is not valid. Details: `postCode` can\'t be empty or blank (value: ' + ctx.instance.postCode + ').',
        });
      } else if (!ctx.instance.state) {
        next({
          statusCode: 400,
          name: 'Bad Request',
          message: 'The `suburb` instance is not valid. Details: `state` can\'t be empty or blank (value: ' + ctx.instance.state + ').',
        });
      } else {
        PostCode.findOne({where: {code: ctx.instance.postCode}})
          .then(function(postcode) {
            if (postcode) {
              ctx.instance.postCodeId = postcode.id;
              return State.findOne({where: {code: ctx.instance.state}});
            } else {
              return Promise.reject({
                code: 400,
                type: 'Bad Request', message: `postCode ${ctx.instance.postCode} does not exists`,
              });
            }
          })
          .then(function(state) {
            if (state) {
              ctx.instance.stateId = state.id;
              ctx.instance.unsetAttribute('postCode');
              ctx.instance.unsetAttribute('state');
              next();
            } else {
              return Promise.reject({code: 400, type: 'Bad Request', message: `state ${ctx.instance.state} does not exists`});
            }
          })
          .catch(function(e) {
            next({
              statusCode: e.code || '500',
              name: e.type || 'Internal Error',
              message: `${e.message}`,
            });
          });
      }
    } else {
      if (!ctx.data.postCode) {
        next({
          statusCode: 400,
          name: 'Bad Request',
          message: 'The `suburb` instance is not valid. Details: `postCode` can\'t be empty or blank (value: ' + ctx.data.postCode + ').',
        });
      } else if (!ctx.data.state) {
        next({
          statusCode: 400,
          name: 'Bad Request',
          message: 'The `suburb` instance is not valid. Details: `state` can\'t be empty or blank (value: ' + ctx.data.state + ').',
        });
      } else {
        PostCode.findOne({where: {code: ctx.data.postCode}})
          .then(function(postcode) {
            if (postcode) {
              ctx.data.postCodeId = postcode.id;
              return State.findOne({where: {code: ctx.data.state}});
            } else {
              return Promise.reject({code: 400, type: 'Bad Request', message: `postCode ${ctx.data.postCode} does not exists`});
            }
          })
          .then(function(state) {
            if (state) {
              ctx.data.stateId = state.id;
              delete ctx.data.postCode;
              delete ctx.data.state;
              next();
            } else {
              return Promise.reject({code: 400, type: 'Bad Request', message: `state ${ctx.data.state} does not exists`});
            }
          })
          .catch(function(e) {
            next({
              statusCode: e.code || '500',
              name: e.type || 'Internal Error',
              message: `${e.message}`,
            });
          });
      }
    }
  });

  Suburb.afterRemote('*', function(ctx, results, next) {
    const PostCode = app.models.PostCode;
    const State = app.models.State;

    var getSuburbReturnProperties = function(suburb) {
      return new Promise(function(resolve, reject) {
        PostCode.findById(suburb.postCodeId)
          .then(function(postCode) {
            if (postCode) {
              suburb.postCode = postCode;
              return State.findById(suburb.stateId);
            } else {
              reject(`postCode ${suburb.postCodeId} does not exists`);
            }
          })
          .then(function(state) {
            suburb.state = state;
            suburb.unsetAttribute('postCodeId');
            suburb.unsetAttribute('stateId');
            resolve(suburb);
          });
      });
    };

    if (results && (ctx.resultType === 'suburb' ||
          _.includes(ctx.resultType, 'suburb'))) {
      if (Array.isArray(ctx.result)) {
        var suburbs = results;
        Promise.all(suburbs.map(function(suburb) {
          return getSuburbReturnProperties(suburb);
        }))
        .then(function(suburb) {
          next();
        })
        .catch(function(e) {
          console.error(e);
        });
      } else {
        getSuburbReturnProperties(results)
          .then(function(suburb) {
            next();
          });
      }
    } else {
      next();
    }
  });

  const getFileFromRequest = (req) => new Promise((resolve, reject) => {
    const form = new multiparty.Form({
      uploadDir: config.tmpDir,
    });
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      const file = files['file'][0]; // get the file from the returned files object
      if (!file) Promise.reject('File was not found in form data.');
      else resolve(file);
    });
  });

  Suburb.importConsignment = function(req, cb) {
    getFileFromRequest(req)
      .then(function(file) {
        var data = fs.readFileSync(file.path, 'utf8');
        data.split('\n').map(function(line, idx) {
          console.log(idx + ' - ' + line);
        });
        cb(null, 'Test');
      });
  };

  Suburb.remoteMethod('importConsignment', {
    accepts: [
      {
        arg: 'req', type: 'object', http: {source: 'req'},
      }, // pass the request object to remote method
    ],
    returns: {root: true, type: 'object'},
    http: {path: '/import', verb: 'post'},
  });
};
