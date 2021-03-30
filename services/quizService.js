const quiz = require('../models/quizQuestions');
const quizCat = require('../models/quizCategory');
const mongoose = require('mongoose');

exports.createQuiz = (body) => {
    return quiz.create(body);
}

exports.newQuizName = (body) => {
    return quizCat.create({
        name: body.name
    });
}

exports.getAllQuizName = () => {
    return quizCat.find({}).select('-__v -createdAt');
}

exports.getAllQuizQuestions = async (quid) => {    
    const ObjectId = mongoose.Types.ObjectId;

    return await quiz.aggregate([
        {
            $match: { quizId: ObjectId(quid) }
        },
        {
            $project: {
                _id: 0,
                category: 1,
                questionDetails: 1,
                options: {$size: '$options'}                            
            }
        }
    ])
}