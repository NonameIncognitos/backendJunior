const { Router } = require('express');
const postRequest = require('../Creater/postRequest');
// const postManager = require('../manager/postManager')
const routerPosts = Router();

routerPosts.post('/posts', postRequest.createPost)
routerPosts.get('/posts', postRequest.getAllPosts)
routerPosts.get('/posts/:id', postRequest.getOnePost)

module.exports = routerPosts;
