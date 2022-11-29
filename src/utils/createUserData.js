const jwt = require('jsonwebtoken');

module.exports = (user) => {
    const { _id, email } = user;
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRATION;

    const token = jwt.sign({ _id, email }, secret, {expiresIn});

    if(!user.password) return { ...user, token };
    
    const { password, ...data } = user._doc;
    return { ...data, token };
}