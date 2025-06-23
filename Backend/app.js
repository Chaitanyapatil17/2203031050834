import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/shorturls', urlRoutes);

await mongoose.connect(process.env.MONGO_URI); // No options needed
console.log('MongoDB connected');

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});