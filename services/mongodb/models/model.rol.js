const { Schema, model } = require('mongoose')

const rolSchema = new Schema(
    {
        name: String
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = model('roles', rolSchema)