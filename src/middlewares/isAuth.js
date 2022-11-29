const PostModel = require('../models/Post');

module.exports = async (req, _, next) => {
    if(req.userEmail !== req.post.creator){
        throw Error("You are not allowed to change this post!")
    }
    next()
}