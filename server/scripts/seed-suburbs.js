'use strict';
const Promise = require('bluebird');
const util = require('util');
const fs = require('fs');
const path = require('path');

const app = require('../server');
const Suburb = app.models.suburb;
const PostCode = app.models.postCode;
const State = app.models.state;

const seedData = fs.readFileSync(
  path.join(__dirname, '../seed-data/post_codes.csv'),
  'utf8'
);

let newSuburbsArray = [];
const subs = seedData.split('\n').map(function(line, idx) {
  console.log(idx);
  if (line) {
    const row = line.split(',');

    const newSuburb = row[0];
    const newPostCode = row[1];
    const newState = row[2];
    let stateId, postCodeId;

    return State.findOrCreate({'code': newState})
      .then(function(state) {
        if (state) {
          stateId = state[0].id;
          return PostCode.findOrCreate({code: newPostCode});
        } else {
          console.log(newState);
          return Promise.reject();
        }
      })
      .then(function(postCode) {
        postCodeId = postCode[0].id;
        newSuburbsArray.push({
          name: newSuburb,
          postCodeId: postCodeId,
          stateId: stateId,
        });
        return Promise.resolve({
          name: newSuburb,
          postCodeId: postCodeId,
          stateId: stateId,
        });
      })
      .catch(function(err) {
        return Promise.reject(err);
      });
  } else {
    Promise.resolve();
  }
});

Promise.all(subs).then(function(ret) {
  // console.log(newSuburbsArray);
  return Suburb.create(newSuburbsArray);
})
.then(function() {
  console.log('Completed!');
})
.catch(function(e) {
  console.log(e);
});
