const mongoose = require('mongoose')

const { MONGODB_HOST, MONGODB_PORT, MONGODB_DB_NAME } = process.env
const uri = `'mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB_NAME}`

mongoose.connect( uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( (db) => {

        console.log(`mongodb : connected\n`)
        // require('./helpers/mongodb.queries').dbInit({
        //     "username": process.env.NAME,
        //     "email":    process.env.ADMIN_EMAIL,
        //     "password": process.env.ADMIN_PASSWORD
        // })

    })
    .catch( error => console.error(`mongodb : ${error.message}`) )
    
module.exports = mongoose