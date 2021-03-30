const user = require('../models/user');

exports.createUser = (body) => {
        const data = user.create(body)
        return data
}
exports.getUser = (id) => {
        return user.findById(id).select('-__v -createdAt -updatedAt');
}
exports.updateUser = (id, data) => {
        return user.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true
        });
}