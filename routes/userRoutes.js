const { Router } = require('express');
const userRequest = require('../Creater/userRequest')
const routerUsers = Router();

routerUsers.post('/users', userRequest.createUser)
routerUsers.get('/users', userRequest.getAll)
routerUsers.get('/users/:id', userRequest.getOneUser)

module.exports = routerUsers;