class MongodbQueries {

    userQueries = require('./mongodb.queries.user')

    //Sing In
    logIn = async ({ email, password }) => {
        const user = await this.userQueries.userByEmail(email)
        await this.userQueries.userComparePass(password, user.password)
        return user._id
    }

    //Sign Up
    register = async (user) => this.userQueries.userSave(user)
        
    newUser = async (body, role = 'user') => { 
        body.password = await this.userQueries.userEncryptPass(body.password)
        body.roles = [ await this.userQueries.roleIdByName(role) ]
        const user = await this.userQueries.userModel(body)
        return user
    }
    
    /* MongoDB Init */
    dbInit = async (body) => {
        try {

            const roles = await this.userQueries.rolesCreate()
            if(roles) console.log('role collections created')
            else return 
            
            const user = await this.newUser(body, 'admin')
            const admin = await this.register(user)
            if(user) console.log('admin user created')
        
        } catch (error) {
            if(error.message === 'user not found') console.log('Admin No Exits')
            if(error.message.includes('duplicate key')) console.log('Admin Exits')
        }

    }
}

module.exports = new MongodbQueries();