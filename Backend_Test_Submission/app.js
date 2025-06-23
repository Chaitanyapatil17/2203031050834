import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import urlRoutes from './routes/urlRoutes.js';

// Import Log function from Logging Middleware
import { Log } from '../Logging_Middleware/src/loggingMiddleware.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use routes
app.use('/shorturls', urlRoutes);

// MongoDB Connection with Logging
try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');

  // Log successful connection
  await Log("backend", "info", "db", "Successfully connected to MongoDB Atlas");
} catch (error) {
  console.error('MongoDB connection error:', error.message);
  await Log("backend", "error", "db", `Failed to connect to MongoDB: ${error.message}`);
  process.exit(1); // Exit on failure
}

// Start the Express Server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Log server start
  await Log("backend", "info", "server", `Express server started on port ${PORT}`);
});

// Optional: Handle graceful shutdown
process.on('SIGINT', async () => {
  await Log("backend", "info", "server", "Shutting down server gracefully...");
  await mongoose.connection.close();
  process.exit(0);
});