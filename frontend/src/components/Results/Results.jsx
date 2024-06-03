import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Results.module.css';

const Results = ({ results }) => {
  const { id } = useParams();
  const quizResults = results.find(result => result.quizId === id);

  if (!quizResults) return <div>No results found for this quiz</div>;

  return (
    <div className={styles.results}>
      <h1>Results for {quizResults.quizTitle}</h1>
      <ul>
        {quizResults.answers.map((answer, index) => (
          <li key={index}>
            Question {index + 1}: {answer.correct ? 'Correct' : 'Incorrect'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
