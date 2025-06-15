import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import postRoutes from './routes/posts.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(postRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

const start = async () => {

    const connectDB = await mongoose.connect(MONGO_URL);
    if (connectDB) {
        console.log('Connected to MongoDB');
    } else {
        console.error('Failed to connect to MongoDB');
        process.exit(1);
    }
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

start();