const express = require('express');

const { userSignUp, login, getUser, sendQuizAnswer, getMarks } = require('../controller/userController');
const { permission } = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', userSignUp);

router.post('/login/:id', login);
// router.use(permission)

console.log('HII!!')
router.route('/quizAnswer/:id/:qid')
    .post(sendQuizAnswer)
    .get(getMarks);

module.exports = router;