import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api/analytics';

const recordImpression = async (quizId) => {
  try {
    const response = await axios.post(`${API_URL}/impression`, { quizId });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

const analyticsService = {
  recordImpression,
};

export default analyticsService;
