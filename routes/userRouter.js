const express = require('express');

const { userSignUp, login, getUser, sendQuizAnswer } = require('../controller/userController');
const { permission } = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', userSignUp);

router.post('/login/:id', login);
// router.use(permission)

router.post('/quizAnswer/:id/:qid', sendQuizAnswer)

module.exports = router;