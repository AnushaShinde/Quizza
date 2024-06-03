import React, { useEffect, useState } from 'react';
import quizService from '../../services/quizService';
import styles from './Dashboard.module.css';

const QuizDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await quizService.getQuizzes();
        if (res && res.data) {
          setQuizzes(res.data);
        } else {
          throw new Error('No data found');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch quizzes. Please try again later.');
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div className={styles.content}>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.stats}>
        <div className={`${styles.stat} ${styles.quizCreated}`}>
          <h3>12</h3>
          <p>Quizzes Created</p>
        </div>
        <div className={`${styles.stat} ${styles.questionsCreated}`}>
          <h3>110</h3>
          <p>Questions Created</p>
        </div>
        <div className={`${styles.stat} ${styles.impressions}`}>
          <h3>1.4K</h3>
          <p>Total Impressions</p>
        </div>
      </div>
      <h2>Trending Quizzes</h2>
      <div className={styles.quizList}>
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div key={quiz._id} className={styles.quiz}>
              <h3>{quiz.title}</h3>
              <p>{quiz.questions} questions</p>
              <div className={styles.quizMeta}>
                <span className={styles.views}>
                  <i className={`${styles.eyeIcon}`}></i> {quiz.views}
                </span>
                <span className={styles.date}>
                  Created on: {new Date(quiz.created).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No quizzes available</p>
        )}
      </div>
    </div>
  );
};

export default QuizDashboard;
