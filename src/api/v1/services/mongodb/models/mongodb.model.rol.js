const { Schema, model } = require('mongoose')

const schema = new Schema(
    { name: String },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = model('roles', schema)