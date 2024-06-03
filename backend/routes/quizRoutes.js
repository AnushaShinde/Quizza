const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createQuiz, getQuizzes } = require('../controller/quizController');
const multer = require('multer');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory where images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Rename files to avoid conflicts
    }
});

const upload = multer({ storage: storage });

// @route POST api/quizzes
// @desc Create a quiz
// @access Private
router.post('/', auth, upload.array('images', 5), createQuiz);

// @route GET api/quizzes
// @desc Get all quizzes
// @access Private
router.get('/', auth, getQuizzes);

module.exports = router;
