const bcrypt = require('bcrypt')
exports.passwordEncrypt = async (password)=>{
    password = await bcrypt.hash(password, 12);
    return password;
}