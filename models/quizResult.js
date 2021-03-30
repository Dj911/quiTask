const mongoose = require('mongoose');

const db = require('../dbConnections/dabMaster');

const quizResultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    quiz: {
        type: mongoose.Types.ObjectId,
        ref: 'Name'
    },
    quizDetails: [
        {
            questionId: {
                type: mongoose.Types.ObjectId,
                ref: 'Questions'
            },
            userSelectedAnswer: Number           // The answer/s selected by the user            
        }
    ],
    marksObtained: {                            // Total Marks obtained by user for this quiz
        type: Number,
        default: 0
    }
}, { collection: 'Result' })

const result = db.model('Result', quizResultSchema);

module.exports = result;