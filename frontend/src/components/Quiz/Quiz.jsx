import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Quiz.module.css';
import trophyImage from '../../assets/image 2.png'; // Import the trophy image

const Quiz = ({ quizData }) => {
  const { id } = useParams();
  const quiz = quizData.find(q => q.id === id);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [timer, setTimer] = useState(quiz.questions[0].timer === 'OFF' ? null : parseInt(quiz.questions[0].timer));
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (timer !== null) {
      const countdown = setInterval(() => {
        setTimer(prev => {
          if (prev > 0) return prev - 1;
          clearInterval(countdown);
          handleNextQuestion();
          return 0;
        });
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleOptionChange = (e) => {
    const { value } = e.target;
    setSelectedOptions([...selectedOptions, value]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(quiz.questions[currentQuestionIndex + 1].timer === 'OFF' ? null : parseInt(quiz.questions[currentQuestionIndex + 1].timer));
    } else {
      const correctAnswers = selectedOptions.reduce((acc, option, index) => {
        if (option === quiz.questions[index].correctOption) return acc + 1;
        return acc;
      }, 0);
      setScore(correctAnswers);
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className={styles.result}>
        <h2>Congratulations!</h2>
        <img src={trophyImage} alt="Trophy" className={styles.trophy} /> {/* Use the imported trophy image */}
        <p>You scored: {score} / {quiz.questions.length}</p>
      </div>
    );
  }

  return (
    <div className={styles.quiz}>
      <h2>{quiz.name}</h2>
      {timer !== null && <div className={styles.timer}>Time Left: {timer}s</div>}
      <div className={styles.question}>
        <p>{quiz.questions[currentQuestionIndex].question}</p>
        {quiz.questions[currentQuestionIndex].options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              name="option"
              value={option}
              onChange={handleOptionChange}
            />
            {option}
          </label>
        ))}
      </div>
      <button onClick={handleNextQuestion} className={styles.nextButton}>Next</button>
    </div>
  );
};

export default Quiz;
