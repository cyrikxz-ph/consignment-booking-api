'use strict';
const util = require('util');
const fs = require('fs');
const path = require('path');

const app = require('../server');
const Suburb = app.models.suburb;
const PostCode = app.models.postCode;
const State = app.models.state;

const stat = util.promisify(fs.read);
const seedData = fs.readFileSync(
  path.join(__dirname, '../seed-data/post_codes.csv'),
  'utf8');

Promise.all(seedData.split('\n').map(function(line) {
  if (line) {
    const row = line.split(',');

    const newSuburb = row[0];
    const newPostCode = row[1];
    const newState = row[2];
    let stateId, postCodeId;

    console.log(newSuburb, newPostCode, newState);
    State.findOrCreate({'code': newState})
      .then(function(state) {
        stateId = state[0].id;
        return PostCode.findOrCreate({code: newPostCode});
      })
      .then(function(postCode) {
        postCodeId = postCode[0].id;
        return Suburb.create({
          name: newSuburb,
          postCodeId: postCodeId,
          stateId: stateId,
        });
      })
      .catch(function(err) {
        console.log(err);
        return Promise.reject(err);
      });
  }
}))
.catch(function(e) {
  console.log(e);
});
