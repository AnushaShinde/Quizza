// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { registerUser, loginUser } = require('../controller/authController');

// @desc Register user
// @access Public
router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    ],
    registerUser
);

// @desc Login user
// @access Public
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    loginUser
);

module.exports = router;
