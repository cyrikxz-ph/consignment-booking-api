'use strict';
var multiparty = require('multiparty');
var path = require('path');
var fs = require('fs');
var config = require('../../server/config.json');

module.exports = function(Consignment) {
  Consignment.disableRemoteMethodByName('prototype.__findById__details');
  Consignment.disableRemoteMethodByName('prototype.__count__details');
  Consignment.disableRemoteMethodByName('prototype.__create__details');
  Consignment.disableRemoteMethodByName('prototype.__delete__details');
  Consignment.disableRemoteMethodByName('prototype.__destroyById__details');
  Consignment.disableRemoteMethodByName('prototype.__findById__details');
  Consignment.disableRemoteMethodByName('prototype.__get__details');
  Consignment.disableRemoteMethodByName('prototype.__updateById__details');

  // Consignment.disableRemoteMethodByName('prototype.updateAttributes');
  // Consignment.disableRemoteMethodByName('prototype.patchAttributes');
  // Consignment.disableRemoteMethodByName('create');
  Consignment.disableRemoteMethodByName('destroyById');
  // Consignment.disableRemoteMethodByName('find');
  // Consignment.disableRemoteMethodByName('findById');
  // Consignment.disableRemoteMethodByName('count');
  Consignment.disableRemoteMethodByName('replaceById');
  Consignment.disableRemoteMethodByName('upsert');
  Consignment.disableRemoteMethodByName('updateAll');
  Consignment.disableRemoteMethodByName('findOne');
  Consignment.disableRemoteMethodByName('confirm');
  Consignment.disableRemoteMethodByName('exists');
  Consignment.disableRemoteMethodByName('replace');
  Consignment.disableRemoteMethodByName('createChangeStream');
  Consignment.disableRemoteMethodByName('replaceOrCreate');
  Consignment.disableRemoteMethodByName('upsertWithWhere');

  const getFileFromRequest = (req) => new Promise((resolve, reject) => {
    const form = new multiparty.Form({
      uploadDir: config.uploadDir,
    });
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      const file = files['file'][0]; // get the file from the returned files object
      if (!file) Promise.reject('File was not found in form data.');
      else resolve(file);
    });
  });

  Consignment.importConsignment = function(req, cb) {
    getFileFromRequest(req)
      .then(function(file) {
        var data = fs.readFileSync(file.path, 'utf8');
        data.split('\n').map(function(line, idx) {
          console.log(idx + ' - ' + line);
        });
        cb(null, 'Test');
      });
  };

  Consignment.remoteMethod('importConsignment', {
    accepts: [
      {
        arg: 'req',
        type: 'object',
        http: {
          source: 'req',
        },
      }, // pass the request object to remote method
    ],
    returns: {
      root: true, type: 'object',
    },
    http: {
      path: '/import', verb: 'post',
    },
  });
};
