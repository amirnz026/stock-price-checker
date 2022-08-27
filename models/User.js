const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    ip: 'String', liked_stocks: ['String']
})
module.exports = mongoose.model('User', userSchema)