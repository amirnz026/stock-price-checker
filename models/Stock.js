const mongoose = require('mongoose')

const StockSchema = new mongoose.Schema({
    stock: {
        type: String,
        required: true
    },
    likes: Number
})

module.exports = mongoose.model('Stock', StockSchema)