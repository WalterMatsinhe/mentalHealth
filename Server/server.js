const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

// JWT Middleware
const { auth, admin } = require('./middleware/auth');

// Protected route for any authenticated user
app.get('/api/user/profile', auth, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.id}!`, user: req.user });
});

// Protected route for admin only
app.get('/api/admin/dashboard', auth, admin, (req, res) => {
  res.json({ message: `Welcome, admin ${req.user.id}!`, user: req.user });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-auth';

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    console.log('MongoDB connected');
    
  })
  .catch((error) => console.log(error));
