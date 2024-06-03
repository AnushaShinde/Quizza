import React from 'react';
import Results from '../components/Results/Results';

const ResultPage = ({ results }) => {
  return (
    <div>
      <Results results={results} />
    </div>
  );
};

export default ResultPage;
