const createError = require('http-errors');

const { requestHandler } = require('../middlewares/requestHandler');
const { passwordEncrypt } = require('../utils/encryptPassword');
const { createUser } = require('../services/userService')
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
        }
        next();
    } catch (err) {
        return next(createError(400, err, { expose: false }))
    }
}