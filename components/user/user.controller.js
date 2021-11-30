const userSchemaMongo = require('../../services/mongodb/models/model.user')
const rolesSchemaMongo = require('../../services/mongodb/models/model.rol')
const jwt = require('../../services/jwt/service.jwt')

class UserController {

    getUserMe = async (req, res) => {
        try {
            const _id = jwt.decodeToken(req.headers)
            const user = await userSchemaMongo.findById(_id).populate('roles')
            res.status(200).json( { "ok": true, user } )

        } catch (error) {
            res.status(500).json( { "ok": false, "error": error.message } )
        } 
    }

    getUserById = async (req, res) => {
        try {
            const { id } = req.params
            const user = await userSchemaMongo.findById(id).populate('roles')
            res.status(200).json( { "ok": true, user } )
        } catch (error) {
            res.status(500).json( { "ok": false, "error": error.message } )
        } 
    }

    getUsers = async (req, res) => {
        try {
            const users = await userSchemaMongo.find().populate('roles')
            res.status(200).json( { "ok": true, users } )
            
        } catch (error) {
            res.status(500).json( { "ok": false, "error": error.message } )
        } 
    }
    
    updateUserById = async (req, res) => {
        try {
            const id = req.params.id, updated = req.body
            const user = await userSchemaMongo.findByIdAndUpdate(id, updated, {new: true})
            res.status(200).json( { "ok": true, user } )

        } catch (error) {
            res.status(500).json( { "ok": false, "error": error.message } )
        } 
    }

    removeUserById = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await userSchemaMongo.findByIdAndDelete(id)
            res.status(200).json( { "ok": true, user } )
        } catch (error) {
            res.status(500).json( { "ok": false, "error": error.message } )
        } 
    }
}

module.exports = new UserController()