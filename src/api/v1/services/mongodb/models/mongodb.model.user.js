const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const schema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: "roles", 
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
})

schema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

schema.statics.comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}

module.exports = model('users', schema)