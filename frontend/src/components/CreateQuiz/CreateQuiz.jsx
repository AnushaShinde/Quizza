import React, { useState } from 'react';
import styles from './CreateQuiz.module.css';

const CreateQuizModal = ({ onClose, onSubmit }) => {
  const [quizName, setQuizName] = useState('');
  const [quizType, setQuizType] = useState('Q&A');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentOptions, setCurrentOptions] = useState([{ type: 'Text', value: '' }]);
  const [optionType, setOptionType] = useState('Text');
  const [timer, setTimer] = useState('OFF');
  const [step, setStep] = useState(1);
  const [quizLink, setQuizLink] = useState('');

  const handleAddOption = () => {
    setCurrentOptions([...currentOptions, { type: optionType === 'Text' ? 'Text' : 'Image', value: '' }]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentOptions];
    newOptions[index].value = value;
    setCurrentOptions(newOptions);
  };

  const handleOptionTypeChange = (type) => {
    setOptionType(type);
    if (type === 'Text') {
      setCurrentOptions([{ type: 'Text', value: '' }]);
    } else if (type === 'Image URL') {
      setCurrentOptions([{ type: 'Image', value: '' }]);
    } else {
      setCurrentOptions([{ type: 'Text', value: '' }, { type: 'Image', value: '' }]);
    }
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: currentQuestion, options: currentOptions, type: optionType, timer }]);
    setCurrentQuestion('');
    setCurrentOptions([{ type: 'Text', value: '' }]);
    setTimer('OFF');
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ name: quizName, type: quizType, questions });
      onClose();
      generateQuizLink();
    } else {
      console.error('onSubmit function is not defined');
    }
  };

  const generateQuizLink = () => {
    // Generate a unique quiz link (you can use any method to generate a unique link)
    const link = `http://your-quiz-app.com/quizzes/${quizName.replace(/\s+/g, '-').toLowerCase()}`;
    setQuizLink(link);
  };

  const copyToClipboard = () => {
    // Copy quiz link to clipboard
    navigator.clipboard.writeText(quizLink);
    alert('Quiz link copied to clipboard!');
  };

  const renderQuizDetailsStep = () => (
    <>
      <h2>Create a New Quiz</h2>
      <input
        type="text"
        placeholder="Quiz name"
        value={quizName}
        onChange={(e) => setQuizName(e.target.value)}
        className={styles.input}
      />
      <div className={styles.quizType}>
        <button onClick={() => setQuizType('Q&A')} className={quizType === 'Q&A' ? styles.active : ''}>
          Q&A
        </button>
        <button onClick={() => setQuizType('Poll Type')} className={quizType === 'Poll Type' ? styles.active : ''}>
          Poll Type
        </button>
      </div>
      <div className={styles.buttons}>
        <button onClick={() => setStep(2)} className={styles.continueButton}>
          Continue
        </button>
        <button onClick={onClose} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </>
  );

  const renderQuestionDetailsStep = () => (
    <>
      <div className={styles.header}>
        <div className={styles.questionCount}>
          {questions.map((_, index) => (
            <div key={index} className={styles.questionNumber}>
              {index + 1}
            </div>
          ))}
          <button onClick={handleAddQuestion} className={styles.addButton}>
            +
          </button>
        </div>
        <div className={styles.minQuestions}>Minimum 5 questions</div>
      </div>
      <div className={styles.questionSection}>
        <input
          type="text"
          placeholder="Question"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          className={styles.input}
        />
        <div className={styles.optionType}>
          <label>
            <input
              type="radio"
              value="Text"
              checked={optionType === 'Text'}
              onChange={() => handleOptionTypeChange('Text')}
            />
            Text
          </label>
          <label>
            <input
              type="radio"
              value="Image URL"
              checked={optionType === 'Image URL'}
              onChange={() => handleOptionTypeChange('Image URL')}
            />
            Image URL
          </label>
          <label>
            <input
              type="radio"
              value="Text & Image URL"
              checked={optionType === 'Text & Image URL'}
              onChange={() => handleOptionTypeChange('Text & Image URL')}
            />
            Text & Image URL
          </label>
        </div>
        {currentOptions.map((option, index) => (
          <div key={index} className={styles.optionContainer}>
            <input
              type={option.type === 'Text' ? 'text' : 'file'}
              placeholder={`Option ${index + 1}`}
              value={option.type === 'Text' ? option.value : undefined}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className={styles.input}
            />
            <button
              onClick={() => {                const newOptions = currentOptions.filter((_, i) => i !== index);
                setCurrentOptions(newOptions);
              }}
              className={styles.deleteButton}
            >
              🗑️
            </button>
          </div>
        ))}
        <button onClick={handleAddOption} className={styles.addButton}>
          Add Option
        </button>
        <div className={styles.timer}>
          Timer:
          <div className={styles.timerOptions}>
            <button
              onClick={() => setTimer('OFF')}
              className={`${styles.timerButton} ${timer === 'OFF' ? styles.active : ''}`}
            >
              OFF
            </button>
            <button
              onClick={() => setTimer('5 sec')}
              className={`${styles.timerButton} ${timer === '5 sec' ? styles.active : ''}`}
            >
              5 sec
            </button>
            <button
              onClick={() => setTimer('10 sec')}
              className={`${styles.timerButton} ${timer === '10 sec' ? styles.active : ''}`}
            >
              10 sec
            </button>
          </div>
        </div>
        <div className={styles.buttons}>
          <button onClick={handleSubmit} className={styles.createButton}>
            Create Quiz
          </button>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );

  const renderQuizLinkSection = () => (
    <>
      <div className={styles.quizLink}>
        <p>Share Quiz Link:</p>
        <div className={styles.linkContainer}>
          <input type="text" value={quizLink} readOnly className={styles.linkInput} />
          <button onClick={copyToClipboard} className={styles.copyButton}>
            Copy
          </button>
        </div>
      </div>
      <div className={styles.congratulations}>
        <img src="/trophy-image.jpg" alt="Trophy" className={styles.trophyImage} />
        <p className={styles.congratsText}>Congratulations! You have successfully created the quiz.</p>
      </div>
    </>
  );

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {step === 1 ? renderQuizDetailsStep() : step === 2 ? renderQuestionDetailsStep() : renderQuizLinkSection()}
      </div>
    </div>
  );
};

export default CreateQuizModal;

