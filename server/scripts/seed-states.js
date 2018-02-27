'use strict';

const app = require('../server');
const State = app.models.state;

State.create({
  code: 'NSW',
  name: 'NEW SOUTH WALES',
})
.then(function(){
  return State.create({
    code: 'SA',
    name: 'SOUTH AUSTRALIA',
  });
})
.then(function() {
  return State.create({
    code: 'TAS',
    name: 'TASMANIA',
  });
})
.then(function() {
  return State.create({
    code: 'ACT',
    name: 'AUSTRALIAN CAPITAL TERRITORY',
  });
})
.then(function() {
  return State.create({
    code: 'QLD',
    name: 'QUEENSLAND',
  });
})
.then(function() {
  return State.create({
    code: 'NT',
    name: 'NORTHERN TERRITORY',
  });
})
.then(function() {
  return State.create({
    code: 'VIC',
    name: 'VICTORIA',
  });
})
.then(function() {
  return State.create({
    code: 'WA',
    name: 'WESTERN AUSTRALIA',
  });
})
.then(function() {
  console.log('Completed!');
});
