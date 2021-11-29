const mongoose = require('mongoose')

const { MONGODB_HOST, MONGODB_PORT, MONGODB_DB_NAME } = process.env
const uri = `'mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB_NAME}`

mongoose.connect( uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( db => console.log(`mongodb : connected\n`) )
    .catch( error => console.error(`mongodb : ${error.message}`) )
    
module.exports = mongoose