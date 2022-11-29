const express = require('express');

const { register, login, googleAuth, getMe } = require('../controllers/usersCtrl');

const validations = require('../validations');
const ctrlWrapper = require('../utils/ctrlWrapper');
const checkAuth = require('../middlewares/checkAuth');
const checkValidationError = require('../middlewares/checkValidationError');

const router = express.Router();

// register
router.post("/register", validations.register, checkValidationError, ctrlWrapper(register));
// login
router.post("/login", validations.login, checkValidationError, ctrlWrapper(login));
// googleAuth
router.post("/google", validations.googleAuth, checkValidationError, ctrlWrapper(googleAuth));
// getMe
router.get("/getMe", checkAuth, ctrlWrapper(getMe));

module.exports = router;