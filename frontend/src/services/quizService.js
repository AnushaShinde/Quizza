// Import the getToken function
import { getToken } from './tokenService';

import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api/quizzes';

const config = () => {
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`, // Use getToken here to get the token
    },
  };
};

const createQuiz = async (data) => {
  try {
    const response = await axios.post(API_URL, data, config());
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

const getQuizzes = async () => {
  try {
    const response = await axios.get(API_URL, config());
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

const getQuizById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, config());
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

const incrementImpressions = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/impressions`, {}, config());
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

const quizService = {
  createQuiz,
  getQuizzes,
  getQuizById,
  incrementImpressions,
};

export default quizService;
