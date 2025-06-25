
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/dbconnector.js';
import authRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/error.middleware.js';

dotenv.config(); // Load environment variables from .env

const app = express();


connectDB();


app.use(cors());

app.use(express.json()); 


app.use('/api/user', authRoutes);



app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ running on ${PORT}`);
});
