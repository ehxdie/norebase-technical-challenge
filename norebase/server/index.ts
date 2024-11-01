import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import articleRoutes from './routes/articleRoutes';

dotenv.config();

const app: Application = express();

// Check for environment variables
// if (!process.env.MONGO_URI) {
//     console.error('Error: MONGO_URI not defined in environment');
//     process.exit(1);
// }

if (!process.env.PORT) {
    console.error('Error: PORT not defined in environment');
    process.exit(1);
}

// Connect to MongoDB
// connectDB().then(() => {
//     console.log('Database connected successfully');
//     // Start server only after successful database connection
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }).catch((error) => {
//     console.error('Database connection failed:', error);
//     process.exit(1);
// });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/articles', articleRoutes);
