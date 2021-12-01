const ajvInstance = require('../service.ajv.instance')

const schema = {
    type: "object",

    properties: {
        username: { type: "string" },
        email: { type: "string", format: "email" },
        password: { type: "string", format: "password" }
    },
    
    required: ["username", "email", "password"],
    additionalProperties: false
}

//password
///^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/


//letter
///^[A-Za-z]+$/

//pattern: "/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/"
  
module.exports = ajvInstance.compile(schema)
