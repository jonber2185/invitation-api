import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import PostsRouter from './router/posts.js';


mongoose.connect(process.env.DATABASE_URL).then(() => console.log("Connected to DB"));

const app = express();

app.use(cors());
app.use(express.json());

app.use('/posts', PostsRouter);

app.listen(process.env.PORT || 3000, () => console.log('Server Started'));