'use strict';

const app = require('../server');
const User = app.models.User;
const Role = app.models.Role;
const RoleMapping = app.models.RoleMapping;

User.create({
  firstName: 'Aleson', lastName: 'Llanes',
  email: 'cyrikxz.ph@gmail.com', password: 'password123'})
.then(function(user) {
  Role.create({ name: 'admin'})
    .then(function(role) {
      return role.principals.create({
        principalType: RoleMapping.USER,
        principalId: user.id,
      });
    })
    .then(function(principal) {
      console.log(principal);
    });
});
