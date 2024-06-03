// components/Analytics/Analytics.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import quizService from '../../services/quizService';
import styles from './Analytics.module.css';

const Analytics = () => {
  const [quizzes, setQuizzes] = useState([]);

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
        // You can handle the error here if needed, but for now, we're not displaying any error message
      }
    };
    fetchQuizzes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await quizService.deleteQuiz(id);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
    } catch (err) {
      console.error(err);
      // You can handle the delete quiz error here if needed
    }
  };

  return (
    <div className={styles.container}>
      <h1>Quiz Analysis</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Quiz Name</th>
            <th>Created on</th>
            <th>Impression</th>
            <th>Actions</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.length > 0 ? (
            quizzes.map((quiz, index) => (
              <tr key={quiz._id}>
                <td>{index + 1}</td>
                <td>{quiz.title}</td>
                <td>{new Date(quiz.created).toLocaleString()}</td>
                <td>{quiz.views}</td>
                <td>
                  <span className={styles.icon} role="img" aria-label="copy">📄</span>
                  <span className={styles.icon} role="img" aria-label="delete" onClick={() => handleDelete(quiz._id)}>🗑️</span>
                  <span className={styles.icon} role="img" aria-label="share">🔗</span>
                </td>
                <td>
                  <Link to={`/analysis/${quiz._id}`}>Question Wise Analysis</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No quizzes available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Analytics;
