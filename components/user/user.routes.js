const router = require('express').Router()
const controller = require("./user.controller")
const { authJwt } = require("../../common/middlewares")

router.route('/')
  .all(authJwt.verifyToken)
  .get(controller.getUsers)
  
router.route('/:id')
  .all(authJwt.verifyToken)
  .get(controller.getUserById)
  .put(controller.updateUserById)
  .delete(controller.removeUserById)

module.exports = router