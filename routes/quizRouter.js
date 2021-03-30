const express = require('express');
const router = express.Router();

const { newQuiz,createQuizName,getQuizName, getAllQuizQuestion } = require('../controller/quizController');

router.route('/question/:id/:qid')       // create new quiz questions by passing a quiz cat id
    .post(newQuiz)
    .get(getAllQuizQuestion)

router.route('/name').post(createQuizName).get(getQuizName)

module.exports = router;