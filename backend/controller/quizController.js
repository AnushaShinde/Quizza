const Quiz = require('../models/quiz');

// Create a quiz
exports.createQuiz = async (req, res) => {
    const { title, questions } = req.body;
    const images = req.files.map(file => file.path); // Get paths of uploaded images

    try {
        const newQuiz = new Quiz({
            title,
            questions,
            images,
            user: req.user.id
        });

        const quiz = await newQuiz.save();
        res.json(quiz);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all quizzes
exports.getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
