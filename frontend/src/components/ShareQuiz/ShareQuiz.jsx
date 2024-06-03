import React, { useState } from 'react';
import styles from './ShareQuiz.module.css';

const ShareQuiz = ({ quizId }) => {
  const [link, setLink] = useState(`${window.location.origin}/quiz/${quizId}`);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  return (
    <div className={styles.shareQuiz}>
      <input type="text" value={link} readOnly />
      <button onClick={copyToClipboard}>Copy Link</button>
    </div>
  );
};

export default ShareQuiz;
