
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/dbconnector.js';
import authRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/error.middleware.js';
import HotelSearch from './routes/hotelSearchRoute.js';

dotenv.config(); // Load environment variables from .env

const app = express();

// Connect to MongoDB
connectDB();


app.use(cors());


app.use(express.json()); // Parses incoming JSON requests


app.use('/api/user', authRoutes);
app.use('/api',HotelSearch);


// // Root route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ running on ${PORT}`);
});
