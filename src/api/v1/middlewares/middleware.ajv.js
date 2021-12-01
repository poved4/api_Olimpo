class MiddlewareAjv {

    //data transfer object
    dto = (req, res, next) => {
        try {
            const schema = this.getSchema(req.url)
            this.validator(schema, req.body)
            next()
        } catch (error) {
            res.status(400).json( { "ok": false, "error": error.message } )
        }
    }

    getSchema = (url) => {
        const path = {
            '/signUp/': require('../services/ajv/schemas/ajv.schema.signUp'),
            '/signIn/': require('../services/ajv/schemas/ajv.schema.signIn'),
            '/':   require('../services/ajv/schemas/ajv.schema.dish')
        }

        return path[url] || undefined
    }

    validator = (ajvValidate, body) => {
        if (!ajvValidate(body)) {
            const errors = ajvValidate.errors
            throw new Error(`${errors[0].message}`)
        }
    }
}

module.exports = new MiddlewareAjv()