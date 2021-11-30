class AuthController {

    mongodbQueries = require('../../services/mongodb/service.mongodb.queries')
    jwt = require('../../services/jwt/service.jwt')
    
    signUp = async (req, res) => {
        try {
            await this.mongodbQueries._singUp(req.body)
            res.status(201).json( { "ok": true } )
        } catch (error) {
            res.status(500).json( { "ok": false, "error": error.message } )
        }
    }

    signIn = async (req, res) => {
        try {
            
            const _id = await this.mongodbQueries._signIn(req.body)
            const token = await this.jwt.generateToken(_id)
            res.status(200).json( { "ok": true, token } )

        } catch (error) {
            res.status(400).json( { "ok": false, "error": error.message } )
        } 
    } 
    
    logOut = async (req, res) => {
        const log = await this.mongodbQueries._logout()
        res.status(200).json({"ok": true, token})
    } 
}

module.exports = new AuthController()



