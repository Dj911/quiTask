const mongoose = require('mongoose');

const dotenv = require('dotenv').config({ path: `${__dirname}/../config/.env` });

const { database } = require('../config/config');

const db = mongoose.createConnection(database.str, database.options);

db.on('connected', () => {
    console.log('DB SUCCESSFULLY CONNECTED 🔑');
})

module.exports = db;