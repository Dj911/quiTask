const quiz = require('../models/quizQuestions');
const quizCat = require('../models/quizName');
const result = require('../models/quizResult');
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

exports.getAllQuizQuestions = (quid) => {       // quid = questionId
    const ObjectId = mongoose.Types.ObjectId;
    return quiz.find({ quizId: ObjectId(quid) }, { 'options.isCorrect': 0, 'options._id': 0 }).select('-__v');

}

exports.newQuizResult = (body) => {
    return result.create(body);
}
exports.updateQuizResult = async (qid, uid, body) => {
    const ObjectId = mongoose.Types.ObjectId;

    return await result.aggregate([
        {
            $match: { $and: [{ user: ObjectId(uid) }, { quiz: ObjectId(qid) }] }
        },
        {
            $project: {
                _id: 0,
                category: 1,
                questionDetails: 1
            }
        }
    ])
}