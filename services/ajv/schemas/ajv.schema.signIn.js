const ajvInstance = require('../service.ajv.instance')

const schema = {
    type: "object",

    properties: {
        email: { type: "string", format: "email" },
        password: { type: "string", format: "password" }
    },
    
    required: ["email", "password"],
    additionalProperties: false
}
  
module.exports = ajvInstance.compile(schema)
