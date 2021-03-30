const mongoose = require('mongoose');

const db = require('../dbConnections/dabMaster');

const quizOptions = new mongoose.Schema({
    optionDetail: {
        type: String,
        required: true
    },
    isCorrect: Boolean,
})
quizOptions.index({ optionDetail: 0 });


const quizQuestionsSchema = new mongoose.Schema({
    category: {                 // Category of quiz question
        type: String,
        required: true     
    },
    questionDetails: {
        type: String,
        required: true,
        unique: true
    },
    options: [quizOptions],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    quizId: {
        type: mongoose.Schema.ObjectId,
        ref: 'QuizCategory'
    }
}, { collection: 'QuizQuestions' })
quizQuestionsSchema.index({ category: 1 });

const quiz = db.model('QuizQuestions', quizQuestionsSchema)

module.exports = quiz;