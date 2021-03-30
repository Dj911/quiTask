const express = require('express');
const router = express.Router();

const { newQuizQuestion, createQuizName, getQuizName, getAllQuizQuestion } = require('../controller/quizController');

router.route('/question/:qid')       // create new quiz questions by passing a quiz cat id
    .post(newQuizQuestion)
    .get(getAllQuizQuestion)

router.route('/name').post(createQuizName).get(getQuizName)

module.exports = router;