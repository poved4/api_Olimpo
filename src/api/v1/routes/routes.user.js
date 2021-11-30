const router = require('express').Router()

const ctrl = require("../controllers/controller.user")
const auth = require("../middlewares/middleware.jwt")

router
  .route('/')
  .all(auth.verifyToken)
  .get(auth.verifyAdminRol, ctrl.usersAll)

router
  .route('/me')
  .all(auth.verifyToken)
  .get(ctrl.userMe)
  .put(ctrl.userMeUpdate)
  .delete(ctrl.userMeRemove)
  
  router
  .route('/:id')
  .all(auth.verifyToken)
  .get(auth.verifyAdminRol, ctrl.userById)
  .put(auth.verifyAdminRol, ctrl.userUpdateById)
  .delete(auth.verifyAdminRol, ctrl.userRemoveById)

module.exports = router