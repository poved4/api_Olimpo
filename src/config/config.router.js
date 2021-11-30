const router = require("express").Router()

router.use("/v1/auth", require("../api/v1/routes/routes.auth"))
router.use("/v1/user", require("../api/v1/routes/routes.user"))

module.exports = router