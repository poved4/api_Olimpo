const router = require("express").Router()

const ctrl = require("../controllers/controller.dishes")
const auth = require("../middlewares/middleware.jwt")
const { dto } = require("../middlewares/middleware.ajv")

router.route('/')
    .get(auth.verifyToken, ctrl.dishesAll) 
    .post(auth.verifyToken, auth.verifyAdminRol, dto, ctrl.dishCreate) 

router.get('/:id', auth.verifyToken, ctrl.dishById) 

router
    .route('/:id')
    .all(auth.verifyToken, auth.verifyAdminRol)
    .put(ctrl.dishUpdateById) 
    .delete(ctrl.dishRemoveById) 
  
module.exports = router