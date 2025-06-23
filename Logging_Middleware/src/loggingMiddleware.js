import axios from 'axios';

// Define the Log API endpoint
const LOG_API_URL = 'http://20.244.56.144/evaluation-service/logs';

/**
 * Reusable logging function.
 * @param {string} stack - The stack (e.g., "backend" or "frontend").
 * @param {string} level - The severity level (e.g., "debug", "info", "warn", "error", "fatal").
 * @param {string} pkg - The package name (e.g., "controller", "handler", etc.).
 * @param {string} message - The log message.
 */
export async function Log(stack, level, pkg, message) {
  // Validate inputs
  if (!["backend", "frontend"].includes(stack.toLowerCase())) {
    throw new Error("Invalid stack value. Must be 'backend' or 'frontend'.");
  }
  if (
    ![
      "debug",
      "info",
      "warn",
      "error",
      "fatal"
    ].includes(level.toLowerCase())
  ) {
    throw new Error(
      "Invalid level value. Must be one of: debug, info, warn, error, fatal."
    );
  }

  // Prepare the log data
  const logData = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: pkg.toLowerCase(), // renamed from package to pkg
    message
  };

  try {
    // Make a POST request to the Log API
    const response = await axios.post(LOG_API_URL, logData);
    console.log('Log successfully sent:', response.data);
  } catch (error) {
    console.error('Error sending log:', error.message);
  }
}