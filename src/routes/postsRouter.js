const express = require('express');

const { getAllPosts,
        getOnePost,
        createPost,
        updatePost,
        deletePost,
        likePost,
        commentPost} = require('../controllers/postsCtrl');


const validations = require('../validations');
const isAuth = require('../middlewares/isAuth');
const isExist = require('../middlewares/isExist');
const ctrlWrapper = require('../utils/ctrlWrapper');
const checkAuth = require('../middlewares/checkAuth');
const checkValidationError = require('../middlewares/checkValidationError');

const router = express.Router();

// getAll
router.get("/", ctrlWrapper(getAllPosts));
// Check if exist
router.use("/:id", isExist);
// getOne
router.get("/:id", ctrlWrapper(getOnePost));
// check if authorized
router.use("/", checkAuth);
// create
router.post("/",
 validations.post,
 checkValidationError, 
 ctrlWrapper(createPost)
);
// comment
router.patch("/:id/comment",
 validations.commentPost,
 checkValidationError,
 ctrlWrapper(commentPost)
);
// update
router.patch("/:id", isAuth, ctrlWrapper(updatePost));
// like
router.patch("/:id/like", ctrlWrapper(likePost));
// delete
router.delete("/:id", isAuth, ctrlWrapper(deletePost));


module.exports = router;