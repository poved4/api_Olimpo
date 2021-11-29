const { Schema, model } = require('mongoose')

const sessionSchema = new Schema({
    id: String,
    token: String,
    user_id: String,
    is_active: Boolean,
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('session', sessionSchema)