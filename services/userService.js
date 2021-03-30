const user = require('../models/user');

exports.createUser = (body)=>{    
        const data = user.create(body)
        return data
}