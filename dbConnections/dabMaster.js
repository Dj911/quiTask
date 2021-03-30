const mongoose = require('mongoose');

const { database } = require('../config/config');

const db = mongoose.createConnection(database.str,database.options);

db.on('connected',()=>{
    console.log('DB SUCCESSFULLY CONNECTED 🔑');
})

module.exports = db;