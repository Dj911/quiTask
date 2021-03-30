const createError = require('http-errors');

const { requestHandler } = require('../middlewares/requestHandler');
const { passwordEncrypt } = require('../utils/encryptPassword');
const { tokenCreation } = require('../utils/token');

const { createUser, getUser, updateUser } = require('../services/userService');
const { newQuizResult, updateQuizResult, getAllQuizQuestions } = require('../services/quizService');

const joi = require('../validation/userValidation');

exports.userSignUp = async (req, res, next) => {
    try {
        const valid = joi.validate(req.body);
        if (valid.error) {
            console.log('ERROR: ', valid.error.message)
            return valid.error.message
        } else {
            req.body.password = await passwordEncrypt(req.body.password);
            const data = await createUser(req.body)
            requestHandler(res, 200, 'Success!', data);
            next();
        }
    } catch (err) {
        return next(createError(400, err, { expose: false }))
    }
}

exports.login = async (req, res, next) => {
    try {
        const token = await tokenCreation(req.params.id);
        const user = await getUser(req.params.id);
        const data = await updateUser(req.params.id, {
            updatedAt: Date.now(), token: token
            // , tokenExpire: Date.now() + 5 * 60 * 60 * 1000 
        });
        requestHandler(res, 200, 'Success!', data);
    } catch (err) {
        return next(createError(400, err, { expose: false }));
    }
}

exports.sendQuizAnswer = async (req, res, next) => {
    try {
        req.body.user = req.params.id;
        req.body.quiz = req.params.qid;
        let quizDetails = req.body.quizDetails;
        let quizId = await getAllQuizQuestions(req.params.qid);

        //// Checks if number of questions are same
        if (quizDetails.length != quizId.length)
            return next(createError(400, "Number of Questions doesn't match", { expose: false }));
        //// Checks if the user answers is in the available option range e.g. 0 for 1st option and so on
        for (let i = 0; i < quizId.length; i++) {
            if (quizDetails[i].userSelectedAnswer >= quizId[i].options.length) {
                return next(createError(400, 'USER ANSWER DOES NOT EXIST!', { expose: false }));
            }
        }

        const data = await newQuizResult(
            {
                user: req.body.user,
                quiz: req.body.quiz,
                quizDetails: quizDetails
            }
        );
        requestHandler(res, 200, 'Success!', data);
    } catch (err) {
        return next(createError(400, err, { expose: false }));
    }
}