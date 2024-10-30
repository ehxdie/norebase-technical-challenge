import express, { Application } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import articleRoutes from './routes/articleRoutes';

const cors = require('cors');

dotenv.config();

const app: Application = express();

// Uncomment to run mongo DB
//connectDB();

app.use(express.json());

//
app.use(cors());

app.use('/api/articles', articleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));