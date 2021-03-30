const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config({ path: `${__dirname}/../config/.env` });

exports.tokenCreation = async (id) => {
    return await jwt.sign({ id: id }, process.env.JWT_SECRET_KEY);
}