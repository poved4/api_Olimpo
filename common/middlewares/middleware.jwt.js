class JwtValidator {

    #jwt = require('../../services/jwt/service.jwt')
    #queries = require('../../services/mongodb/service.mongodb.queries')
    
    verifyToken = (req, res, next) => {
        try {

            const verified = this.#jwt.verifyToken(req.headers)
            if(!verified) throw new Error('Unauthorized')
            else next()

        } catch (error) {
            res.status(401).json( { "ok": false, "error": error.message } )
        } 
    }

    verifyModeratorRol = async (req, res, next) => {
        try {

            const _id = this.#jwt.decodeToken(req.headers)
            const dbRole = await this.#queries.getRoleByName('moderator')
            const user = await this.#queries.getUserRoleById(_id)
    
            if(dbRole._id !== user.roles[0]._id) throw new Error('Unauthorized')
            else next()

        } catch (error) {
            res.status(401).json( { "ok": false, "error": error.message } )
        } 
    }
    
    verifyAdminRol = async (req, res, next) => {
        try {

            const _id = this.#jwt.decodeToken(req.headers)
            const dbRole = await this.#queries.getRoleByName('admin')
            const user = await this.#queries.getUserRoleById(_id)
    
            if(dbRole._id !== user.roles[0]._id) throw new Error('Unauthorized')
            else next()

        } catch (error) {
            res.status(401).json( { "ok": false, "error": error.message } )
        } 
    }

}

module.exports = new JwtValidator()