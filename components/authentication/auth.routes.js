const router = require("express").Router()
const controller = require("./auth.controller")
const { authJwt } = require("../../common/middlewares")

router
    .post('/signUp', controller.signUp) 
    .post('/signIn', controller.signIn) 
    .post('/logOut', controller.logOut) 
  
module.exports = router