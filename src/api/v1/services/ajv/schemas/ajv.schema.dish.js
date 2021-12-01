const ajvInstance = require('../service.ajv.instance')

const schema = {
    type: "object",

    properties: {
        name:           { type: 'string' },
        price:          { type: "number" },
        category:       { enum: ["specials", "appetizers", "salads", "drinks"] },
        imageUrl:       { type: "string", format: "uri-reference" },
        description:    { type: "string" },
    },
    
    required: ["name", "price", "category", "imageUrl", "description"],
    additionalProperties: false
}
  
module.exports = ajvInstance.compile(schema)