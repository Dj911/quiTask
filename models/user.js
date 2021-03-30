const mongoose = require('mongoose');

const db = require('../dbConnections/dabMaster');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: String,
    tokenExpire: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: Date
}, { collection: 'User' })

const user = db.model('User', userSchema)

module.exports = user;