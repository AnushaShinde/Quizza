const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const quizRoutes = require('./routes/quizRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes'); // Import analytics routes
const path = require('path');
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Static folder for image uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizRoutes);
app.post('/api/analytics/impression', (req, res) => {
    // Here you would handle recording the impression
    const { quizId } = req.body;
    
    // Example: Log the quizId
    console.log(`Impression recorded for quiz with ID: ${quizId}`);
    
    // Send a response
    res.status(200).json({ message: 'Impression recorded successfully' });
  }); // Use analytics routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
