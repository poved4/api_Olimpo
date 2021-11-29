const server = require('./config/config.server')
const { EXPRESS_PORT } = process.env

//Server
server.listen(EXPRESS_PORT, 
  console.log(`http://127.0.0.1:${EXPRESS_PORT}`) 
)