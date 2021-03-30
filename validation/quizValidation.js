const joi = require('joi');
const option = joi.object({
    optionDetail: joi.string().required(),      // CANNOT BE UNIQUE
    isCorrect: joi.boolean()
})
const joiSchema = joi.object({
    user: joi.string().required(),
    category: joi.string().min(5).max(12),
    questionDetails: joi.string().required().min(5).max(50),
    options: joi.array().items(option),
    quizId: joi.string().required(),
    marks: joi.number().default(3).required()
}).options({ abortEarly: false })     // will show all the validation error, by default it's true

module.exports = joiSchema