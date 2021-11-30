class ControllerUser {

    jwt = require('../services/jwt/service.jwt')
    queriesUser = require('../services/mongodb/helpers/mongodb.queries.user')

    /* User Me */
    userMe = async (req, res) => {
        try {

            const _id = this.jwt.decodeToken(req.headers)
            const user = await this.queriesUser.userById(_id)
            res.status(200).json( { "ok": true, user } )

        } catch (error) {
            res.status(500).json( { "ok": false, "error": error.message } )
        } 
    }

    userMeUpdate = async (req, res) => {
        try {

            const id = this.jwt.decodeToken(req.headers)
            const user = this.queriesUser.userUpdate(id, req.body)
            console.log(user)
            res.status(200).json( { "ok": true, user } )

        } catch (error) {
            res.status(500).json( { "ok": false, "error": error.message } )
        } 
    }

    userMeRemove = async (req, res) => {
        try {

            const id = this.jwt.decodeToken(req.headers)
            const user = await this.queriesUser.userRemove(id)
            res.status(200).json( { "ok": true, user } )

        } catch (error) {
            res.status(500).json( { "ok": false, "error": error.message } )
        } 
    }

    /* User Admin  */
    userById = async (req, res) => {
        try {

            const id = req.params.id
            const user = await this.queriesUser.userById(id)
            res.status(200).json( { "ok": true, user } )

        } catch (error) {
            res.status(500).json( { "ok": false, "error": error.message } )
        } 
    }

    usersAll = async (req, res) => {
        try {
            console.log('Hello')
            // const users = await this.queriesUser.users()
            const users = true
            res.status(200).json( { "ok": true, users } )
            
        } catch (error) {
            res.status(500).json( { "ok": false, "error": error.message } )
        } 
    }

    userUpdateById = async (req, res) => {
        try {

            const id = req.params.id
            const document = req.body
            const user = this.queriesUser.userUpdate(id, document)
            res.status(200).json( { "ok": true, user } )

        } catch (error) {
            res.status(500).json( { "ok": false, "error": error.message } )
        } 
    }

    userRemoveById = async (req, res) => {
        try {

            const id = req.params.id
            const user = await this.queriesUser.userRemove(id)
            res.status(200).json( { "ok": true, user } )

        } catch (error) {
            res.status(500).json( { "ok": false, "error": error.message } )
        } 
    }

}

module.exports = new ControllerUser()