const mongoose = require('mongoose');

const db = require('../dbConnections/dabMaster');

const quizOptions = new mongoose.Schema({
    optionDetail: {
        type: String,
        required: true
    },
    isCorrect: {
        type:Boolean,
        default: false
    }
})

const quizQuestionsSchema = new mongoose.Schema({
    category: {                 // Category of quiz question
        type: String,
        required: true
    },
    questionDetails: {
        type: String,
        required: true
    },
    options: [quizOptions],
    quizId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Name'
    },
    marks: Number
}, { collection: 'Questions' })
quizQuestionsSchema.index({ category: 1 });

const quiz = db.model('Questions', quizQuestionsSchema)

module.exports = quiz;