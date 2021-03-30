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
}, { collection: 'QuizCategory' })

const quizCat = db.model('QuizCategory', quizCategorySchema)

module.exports = quizCat;