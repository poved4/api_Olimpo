class mongodbQueries {
    #modelRole = require('./models/model.rol')
    #modelUser = require('./models/model.user')
    #modelSession = require('./models/model.session')

    findUserByProperty = async (property) => {
        const data = await this.#modelUser.findOne({property}).populate("roles")
        if (!data) throw new Error('wrong data')
        return data
    }

    comparePass = async (plainText, hash) => {
        const match = await this.#modelUser.comparePassword(plainText, hash)
        if(!match) throw new Error('wrong data')
        return match
    }
    
    encryptPass = async (password) => {
        return await this.#modelUser.encryptPassword(password)
    }

    createNew = ({ username, email, password, roles }) => {
        return new this.#modelUser({
            username, email, password, roles
        })
    }

    roleId = async (name) => {
        const role = await this.#modelRole.findOne({ name })
        return [ role._id ]
    }

    
    getRoleByName = async (name) => await this.#modelRole.findOne({ name })
    getUserRoleById = async (_id) => await this.#modelUser.findById(_id).populate("roles")




    _signIn = async ({ email, password }) => {
        const user = await this.findUserByProperty(email)
        await this.comparePass(password, user.password)
        return user._id
    }

    _singUp = async (body) => {
        body.password = await this.encryptPass(body.password)
        body.roles = await this.roleId('user')

        const user = await this.createNew(body).save()
        if (!user) throw new Error('unsaved user data')
        return user
    }

    _logout = () => {
        return true
    }
}

module.exports = new mongodbQueries();