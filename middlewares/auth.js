const user = require('../models/user')
const createError = require('http-errors');

exports.permission = async (req, res, next) => {
    if (!req.headers.authorization) {       //checking token is exist in header or not
        return next(createError(500, 'Please provide the token in headers'));
    }

    const User = await user.findOne({ token: req.headers.authorization });      //verify user based on token 
    if (!User) {
        return next(createError(500, "You are not authorized user", 500));
    }

    if (User.userTokenExpire < Date.now()) {        //checking token expired 
        return next(createError(500, "You have to login again", 500));
    }

    req.user = User;      //storing logged user detail in req.user
    console.log('DATE: ', new Date())
    next();
};