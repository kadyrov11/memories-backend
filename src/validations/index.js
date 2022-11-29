const { body } = require('express-validator');

// Post
const post = [
  body('title', 'Title is required').isLength({ min: 3, max: 50 }),
  body('message', 'Message is required').isLength({ min: 3, max: 200 }),
  body('tags', 'Tags must be Array of strings').isArray().optional(),
  body('imageUrl', 'ImageUrl is required').isString()  
];

const commentPost = [
  body('title', 'Title is required').isLength({ max: 250 }) 
];

// Auth
const register = [
    body('name', 'Name is required (min length 2)').isLength({ min: 2 }),
    body('lastName', 'Last name is required (min length 2)').isLength({ min: 2 }),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be at least 8 characters').isLength({
      min: 8
    })
]; 

const login = [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be at least 8 characters').isLength({min: 8})
]; 

const googleAuth = [
  body('email', 'Invalid email').isEmail(),
  body('googleId', 'googleId is required').isString(),
  body('givenName', 'givenName is required').isString(),
  body('familyName', 'familyName is required').isString()
]; 

module.exports = { register, login, googleAuth, post, commentPost };