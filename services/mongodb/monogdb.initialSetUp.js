class dbInitSetup {
    constructor(modelRol, modelUser) {
        this.modelRol = modelRol
        this.modelUser = modelUser
    }

    init() { 
        try {
            this.createRoles()
            this.createUsers()
        } catch (error) { console.error(error) }
    }

    createRoles = async () => {

        if(await this.modelRol.estimatedDocumentCount() > 0) return
        
        const values = await Promise.all([
            new this.modelRol({ name: 'user' }).save(),
            new this.modelRol({ name: 'admin' }).save(),
            new this.modelRol({ name: 'moderator' }).save()
        ])
        
        console.log(`updated role collection: ${values}`);
    }

    createUsers  = async () => {

        if(await this.modelUser.estimatedDocumentCount() > 0) return

        const admin = new this.modelUser({
            "username": "admin",
            "email":    "admin@gmail.com",
            "password": "@admin_123456789",
            "roles":      ['admin', 'moderator', 'user']
        }).save()
        
        console.log(`updated admin user: ${admin}`);
    }
}

const dbInit = new dbInitSetup(require('../components/models/model.rol'), require('../components/models/model.user'))
dbInit.init()