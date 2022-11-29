const { model, Schema } = require('mongoose');

const postModel = Schema(
 {
    title: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
    },
    tags: [String],
    imageUrl: String,
    likes: {
        type: Array,
        default: [],
    },
    comments: {
        type: Array,
        default: [],
    },
 },
 {
    timestamps: true
 }
);

module.exports = model('Posts', postModel)