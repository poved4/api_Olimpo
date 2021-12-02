class ControllerAuth {

    jwt = require('../services/jwt/service.jwt')
    mongodb = require('../services/mongodb/helpers/mongodb.queries')
    
    signUp = async (req, res) => {
        try {

            const user = await this.mongodb.newUser(req.body)
            await this.mongodb.register(user)
            res.status(201).json( { "ok": true, user } )

        } catch (error) {
            res.status(500).json( { "ok": false, "error": error.message } )
        }
    }

    signIn = async (req, res) => {
        try {

            const id = await this.mongodb.logIn(req.body)
            const token = await this.jwt.generateToken(id)
            res.status(200).json( { "ok": true, token } )

        } catch (error) {
            res.status(500).json( { "ok": false, "error": error.message } )
        } 
    } 
    
    logOut = async (req, res) => {
        const log = await this.mongodb.logout()
        res.status(200).json({"ok": true })
    } 
}

module.exports = new ControllerAuth()



