// controller/analyticsController.js
const Quiz = require('../models/quiz');

exports.recordImpression = async (req, res) => {
    const { quizId } = req.body;

    try {
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ msg: 'Quiz not found' });
        }

        quiz.views += 1;
        await quiz.save();

        res.json({ msg: 'Impression recorded', quiz });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
