const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');

const createUserData = require('../utils/createUserData');

const register = async (req) => {
    const user = req.body

    const passwordHash = bcrypt.hashSync(user.password, Number(process.env.SALT));
    const newUser = await UserModel.create({ ...user, password: passwordHash });

    const data = createUserData(newUser);
    return data;
};

const login = async (req) => {  
    const { email, password } = req.body;
    
    const user = await UserModel.findOne({ email });

    if(!user){
        throw Error("User is not found.");
    };
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw Error('Wrong email or password!');
    };

    const data = createUserData(user);
    return data;
};

const googleAuth = async (req) => {  
    const gUser = req.body;

    const user = {
        _id: gUser.googleId,
        email: gUser.email,
        name: gUser.givenName,
        lastName: gUser.familyName,
        imageUrl: gUser.imageUrl
    };

    const data = createUserData(user);
    return data;
};

const getMe = async (req) => {
    const user = await UserModel.findById(req.userId);
    if(!user){
        throw Error("User is not found.");
    };
    const { password, ...data } = user._doc;
    return data;
};

module.exports = { register, login, googleAuth, getMe };

// const gUser = req.body;

// const user = await UserModel.findOne({email: gUser.email});

// const userObj ={
//     email: gUser.email,
//     name: gUser.givenName,
//     lastName: gUser.familyName,
// };

// if(!user){
//     const user = await UserModel
// }