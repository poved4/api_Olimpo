const router = require("express").Router()
const { signUp, signIn, logOut } = require("./auth.controllers")
const { dto } = require("../../common/middlewares/middleware.ajv")

router
    .post('/signUp', dto, signUp) 
    .post('/signIn', dto, signIn) 
    .post('/logOut', logOut) 
  
module.exports = router