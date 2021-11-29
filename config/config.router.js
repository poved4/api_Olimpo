const router = require("express").Router()

// router.use("/auth", require("../components/routes/routes.auth"))
router.use("/user", require("../components/user/user.routes"))

module.exports = router