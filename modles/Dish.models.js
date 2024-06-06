const mongoose = require('mongoose')

const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    isAvailable: {
        type: Boolean,
        require: true,
        default: true,
    },
})

module.exports = mongoose.model('Dish', dishSchema)