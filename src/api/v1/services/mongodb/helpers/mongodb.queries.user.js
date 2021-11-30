class MongodbQueriesUser {

    modelRole = require('../models/mongodb.model.rol')
    modelUser = require('../models/mongodb.model.user')

    //Router Users
    users = async () =>{
        const users = await this.modelUser.find({}).populate("roles")
        if(!users) throw new Error('no data')
        return users
    }
    
    userById = async (_id) => {
        const user = await this.modelUser.findOne({_id}).populate("roles")
        if(!user) throw new Error('user not found')
        return user 
    }
    
    userByEmail = async (email) => {
        const user = await this.modelUser.findOne({email}).populate("roles")
        if(!user) throw new Error('user not found')
        return user
    }

    userUpdate = async (_id, document) => {
        return await this.modelUser.findByIdAndUpdate(
            _id, document, { new : true }
        )
    }

    userSave = async (user) => user.save()

    userRemove = async (_id) => await this.modelUser.findByIdAndRemove(_id)

    /* Model User */
    userComparePass = async (plainText, hash) => {
        const match = await this.modelUser.comparePassword(plainText, hash)
        if(!match) throw new Error('incorrect data')
        return match
    }

    userEncryptPass = async (password) => await this.modelUser.encryptPassword(password)

    userModel = async ({ username, email, password, roles }) => {
        return new this.modelUser({
            username, email, password, roles
        })
    }

    /* Role */
    rolesCreate = async () => {
        
        const count = await this.modelRole.estimatedDocumentCount()
        if(count > 0) return
        
        const values = await Promise.all([
            new this.modelRole({ name: 'user' }).save(),
            new this.modelRole({ name: 'admin' }).save(),
        ])
        
        return values
    }
    
    roleByName = async (name) => await this.modelRole.findOne({ name })
    
    roleIdByName = async (name) => {
        const role = await this.roleByName(name)
        return role._id
    }

}

module.exports = new MongodbQueriesUser();