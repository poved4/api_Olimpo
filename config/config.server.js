//Essentials
require('dotenv').config() 
require('../services/mongodb/service.mongodb')

//Packages
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const server = express()

//Middlewares
server.use(cors())
server.use(helmet())
server.use(morgan('dev'))
server.use(express.json())
server.use(express.urlencoded( {extended: true} ))

//Router
server.use("/api/v1/", require("./config.router"))

module.exports = server