const createError = require('http-errors');

const { createQuiz, newQuizName, getAllQuizName, getAllQuizQuestions } = require('../services/quizService');
const { requestHandler } = require('../middlewares/requestHandler');
const joi = require('../validation/quizValidation');

exports.createQuizName = async (req, res, next) => {
    try {
        const data = await newQuizName(req.body)
        requestHandler(res, 200, 'Success!', data);
    } catch (err) {
        return next(createError(400, err, { expose: false }))
    }
}

exports.getQuizName = async (req, res, next) => {
    try {
        const data = await getAllQuizName();
        requestHandler(res, 200, 'Success!', data);
    } catch (err) {
        return next(createError(400, err, { expose: false }));
    }
}

exports.newQuizQuestion = async (req, res, next) => {
    try {
        req.body.quizId = req.params.qid;
        const valid = joi.validate(req.body);
        if (valid.error) {
            console.log('ERROR: ', valid.error.message)
            return next(createError(400, valid.error.message, { expose: false }))
        }
        const data = await createQuiz(req.body);
        requestHandler(res, 200, 'Success!', data);
    } catch (err) {
        return next(createError(400, err, { expose: false }))
    }
}

exports.getAllQuizQuestion = async (req, res, next) => {
    try {
        const data = await getAllQuizQuestions(req.params.qid);
        requestHandler(res, 200, 'Success!', data);
    } catch (err) {
        return next(createError(400, err, { expose: false }))
    }
}