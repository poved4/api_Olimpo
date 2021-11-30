const router = require("express").Router()

const ctrl = require("../controllers/controllers.auth")
const { dto } = require("../middlewares/middleware.ajv")

router
    .post('/signUp', dto, ctrl.signUp) 
    .post('/signIn', dto, ctrl.signIn) 
    .post('/logOut', ctrl.logOut) 
  
module.exports = router