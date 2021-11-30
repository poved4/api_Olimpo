class MiddlewareJwt {

    jwt = require('../services/jwt/service.jwt')
    mqUser = require('../services/mongodb/helpers/mongodb.queries.user')
    
    verifyToken = (req, res, next) => {
        try {
            
            const verified = this.jwt.verifyToken(req.headers)
            if(!verified) throw new Error('Unauthorized')
            else next() 

        } catch (error) {
            res.status(401).json( { "ok": false, "error": error.message } )
        } 
    }

    verifyAdminRol = async (req, res, next) => {
        try {

            const _id = this.jwt.decodeToken(req.headers)._id
            const dbRoleId = await this.mqUser.roleIdByName('admin')
            const user = await this.mqUser.userById(_id)
            
            if(dbRoleId.equals(user.roles[0]._id)) next()
            else throw new Error('Unauthorized') 

        } catch (error) {
            res.status(401).json( { "ok": false, "error": error.message } )
        } 
    }

}

module.exports = new MiddlewareJwt()