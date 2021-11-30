const router = require('express').Router()
const { verifyToken, verifyAdminRol } = require("../../common/middlewares/middleware.jwt")
const { getUsers, getUserMe, getUserById, updateUserById, removeUserById } = require("./user.controller")

router.route('/')
  .get(verifyToken, verifyAdminRol, getUsers)

router.route('/me')
  .get(verifyToken, getUserMe)
  
router.route('/:id')
  .all(verifyToken, verifyAdminRol)
  .get(getUserById)
  .put(updateUserById)
  .delete(removeUserById)

module.exports = router