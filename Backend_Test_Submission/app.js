import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import urlRoutes from './routes/urlRoutes.js';
import { Log } from '../Logging_Middleware/src/loggingMiddleware.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use('/shorturls', urlRoutes);


try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');

  
  await Log("backend", "info", "db", "Successfully connected to MongoDB Atlas");
} catch (error) {
  console.error('MongoDB connection error:', error.message);
  await Log("backend", "error", "db", `Failed to connect to MongoDB: ${error.message}`);
  process.exit(1); 
}

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  await Log("backend", "info", "server", `Express server started on port ${PORT}`);
});

process.on('SIGINT', async () => {
  await Log("backend", "info", "server", "Shutting down server gracefully...");
  await mongoose.connection.close();
  process.exit(0);
});