const userModel = require('../../services/mongodb/models/model.user');
const authJwt = require('../../services/authentication/service.auth.jwt')

const verifyToken = (req, res, next) => {
    try {
        const authorization = req.headers
        const isVerified = authJwt.verifyToken(authorization)
        if(isVerified) next()
    } catch (error) {
        res.status(400).json( { "ok": false, "error": error.message } )
    } 
}

const onlyAdmin = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization
        const _id = authJwt.decodeToken(authorization)._id
        const { roles } = await userModel.findOne({_id}).populate("roles")

        if(roles[0].name === 'user') throw new Error('Unauthorized') 
        else next()
    } catch (error) {
        res.status(401).json( { "ok": false, "error": error.message } )
    } 
}

module.exports = { verifyToken, onlyAdmin }