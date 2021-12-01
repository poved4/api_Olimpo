const { Schema, model } = require('mongoose')

const schema = new Schema({
    name: {
        type: String,
        unique: false,
        required: true
    },
    price: {
        type: Number,
        unique: false,
        required: true
    },
    category: {
        type: String,
        enum: ["specials", "appetizers", "salads", "drinks"],
        default: 'appetizers'
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, 
{
    timestamps: true,
    versionKey: false
})

module.exports = model('dishes', schema)