const mongoose = require('mongoose');

const PostModel = require('../models/Post')

const isExist = async (req, res, next) => {
    const { id } = req.params

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('Wrong ID type.');
        };

        const post = await PostModel.findById(id)
        
        if(!post) {
            throw Error('Post is not found.');
        };

        req.post = post;
        next()
    } catch (err) {
        next(err)
    }
};

module.exports = isExist;