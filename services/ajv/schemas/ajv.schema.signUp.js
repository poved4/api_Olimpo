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
  
module.exports = ajvInstance.compile(schema)
