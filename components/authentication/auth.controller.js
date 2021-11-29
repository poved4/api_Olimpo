const queriesMongo = require('../../common/libs/library.mongodb.queries')
const User = require('../../services/mongodb/models/model.user')
const Role = require('../../services/mongodb/models/model.rol')

class AuthController {

    signUp = async (req, res) => {
    
        const { username, email, password } = req.body
        const role = await Role.findOne({ name: 'user' })
    
        const newUser = new User({
            username,
            email,
            // roles = role[role._id],
            password: await User.encryptPassword(password),
        })

        // if(roles) {
        //     const foundRoles = await Role.find({name: {$in: roles}})
        //     newUser.roles = foundRoles.map(role => role._id)
        // } else {
        //     const role = await Role.findOne({name: 'user'})
        //     newUser.roles = [role._id]
        // }

    
        const savedUser = await newUser.save()
        if (savedUser) res.status(201).json( {"ok": true} )
    }

    signIn = async (req, res) => {
        try {
            const authJwt = require('../../services/authentication/service.auth.jwt')
            const userFound = await User.findOne({email: req.body.email}).populate("roles")
            if(!userFound) throw new Error('wrong data')
            
            const matchPassword = await User.comparePassword(req.body.password, userFound.password)
            if(!matchPassword) throw new Error('wrong data')
    
            const token = await authJwt.generateToken(userFound._id)
    
            res.status(200).json( { "ok": true, token } )
                
        } catch (error) {
            res.status(500).json( { "ok": false, "error": error.message } )
        } 
    } 
    
    logOut = async (req, res) => {
        
        res.status(200).json({"ok": true, token})
    } 
}

module.exports = new AuthController()



