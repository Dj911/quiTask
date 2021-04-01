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
exports.updateQuizResult = async (qid, uid) => {
    const ObjectId = mongoose.Types.ObjectId;

    return await result.aggregate([
        {
            $match: { $and: [{ user: ObjectId(uid) }, { quiz: ObjectId(qid) }] }
        },
        {
            $unwind: { path: "$quizDetails", preserveNullAndEmptyArrays: true }
        },
        {
            $lookup:
            {
                from: "Questions",
                // let: { quesId: "$quizDetails.questionId", userAnswer: "$quizDetails.userSelectedAnswer" },
                localField: 'quizDetails.questionId',
                foreignField: '_id',
                as: "questions"
            },
        },
        {
            $project: {
                _id: 1,
                quiz: 1,
                quizDetails: 1,
                questions: { $arrayElemAt: ["$questions", 0] },
                options: "$questions.options",
                marksObtained: 1
            }
        },
        {
            $project: {
                _id: 1,
                quiz: 1,
                quizDetails: 1,
                // questions: 1,
                marksObtained: 1,
                options: 1,
                marks: "$questions.marks",
                answer:
                {
                    $filter: {
                        input: { $arrayElemAt: ["$options", 0] },
                        as: "ans",
                        cond: {
                            $eq: ["$$ans.isCorrect", true]
                        }
                    }
                }
            }
        },
        {
            $project: {
                _id: 1,
                quiz: 1,
                quizDetails: 1,
                correctanswer: { $arrayElemAt: ["$answer", 0] },
                marks: 1,
                marksObtained: 1
                // {$eq: ["$$correctanswer","$quizDetails.userSelectedAnswer"]}
            }
        },
        {
            $project: {
                _id: 1,
                quiz: 1,
                rightAnswer: "$correctanswer.optionDetail",
                userAnswer: "$quizDetails.userSelectedAnswer",
                marks: 1,
                marksObtained: 1
            }
        },
        {
            $project: {
                _id: 1,
                quiz: 1,
                rightAnswer: 1,
                userAnswer: 1,
                marks: 1,
                // marksObtained: 1,
                marksObtained: {
                    $cond: {
                        if: { $eq: [{ $strcasecmp: ["$rightAnswer", "$userAnswer"] }, 0] },
                        then: "$marks",
                        else: "$marksObtained"
                    }
                }
            }
        },
        {
            $group: {
                _id: "$_id",
                totalMarks: {
                    $sum: "$marksObtained"
                }
            }
        }
    ])
}

exports.updateResult = (id,data) => {
    return result.findByIdAndUpdate(,, {
        new: true,
        runValidators: false,
    })
}