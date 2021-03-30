const mongoose = require('mongoose');

const db = require('../dbConnections/dabMaster');

const quizCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: Date
}, { collection: 'Name' })

const quizCat = db.model('Name', quizCategorySchema)

module.exports = quizCat;