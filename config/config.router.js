const router = require("express").Router()

router.use("/auth", require("../components/authentication/auth.routes"))
router.use("/user", require("../components/user/user.routes"))

module.exports = router