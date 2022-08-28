const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    hashedIp: {type: String, required: true}, likedStocks: {type: [String], required: true}
})
module.exports = mongoose.model('User', UserSchema)