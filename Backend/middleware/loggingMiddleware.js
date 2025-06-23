export default function loggingMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.path;
  const ip = req.ip;

  console.log(`[${timestamp}] ${method} ${path} - ${ip}`);
  next();
}