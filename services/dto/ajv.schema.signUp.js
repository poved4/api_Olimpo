const ajvInstance = require('./ajv.instance')

const signUpSchema = {
    type: "object",

    properties: {
        username: { type: "integer" },
        email: { type: "string", format: "email" },
        password: { type: "string", format: "password" }
    },
    
    required: ["username", "email", "password"],
    additionalProperties: false
}
  
module.exports = ajvInstance.compile(signUpSchema)
