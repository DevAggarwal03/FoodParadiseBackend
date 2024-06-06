const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    comment: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model("Review", reviewSchema)