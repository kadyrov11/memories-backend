const PostModel = require('../models/Post');

const createPost = async (req, _, next) => {
  const { userEmail } = req;
  const post = req.body
  try {
    const newPost = await PostModel.create({ ...post, creator: userEmail});
        
    return newPost
  } catch (err) {
    next(err)
  }
};

 const getAllPosts = async (req) => {
  const { page = 1, limit = 4, search = '' } = req.query;
  const skip = (page - 1) * limit;

  const title = new RegExp(search, 'i');

  const posts = await PostModel.find({ title }).sort({createdAt: -1}).skip(skip).limit(limit).exec();
  const pageCount = Math.ceil(await PostModel.find({ title }).countDocuments().exec() / limit);

  return { posts, pageCount};
};

const updatePost = async (req) => {
  const { id } = req.params

  const updatedPost = await PostModel.findByIdAndUpdate(id, req.body, { new: true });
    
  return updatedPost
};

const getOnePost = async (req) => {
  const { id } = req.params;
  const post = await PostModel.findById(id);
  return post;
};

const commentPost = async (req) => {
  const { id } = req.params;
  const { comment } = req.body;

  const newComment = {
    email: req.userEmail,
    comment
  };
   
  await PostModel.findByIdAndUpdate(id,{$push: {comments: newComment}}, {new: true});

  return newComment;
};

const deletePost = async (req) => {
  const { id } = req.params

  await PostModel.findByIdAndDelete(id)

  return {
    success: true,
    message: `Post(${id}) has been deleted.`
  };
}

const likePost = async (req) => {
  const { id } = req.params;
  const { userId } = req;
  const { likes } = req.post;

  const toggledLike = likes.includes(userId) ? '$pull' : '$push'
  
  const post = await PostModel.findByIdAndUpdate(id,{[toggledLike]: {likes: userId}}, {new: true});
  
  return post;
};

module.exports = { getAllPosts, createPost, updatePost, deletePost, likePost, getOnePost, commentPost };