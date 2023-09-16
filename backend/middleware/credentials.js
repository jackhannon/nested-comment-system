const allowedOrigins = [
  'http://127.0.0.1:5500',
  'http://localhost:5173',
  'http://localhost:5000'
];
const credentials = (req, res, next) => {
  const origin = req.headers.origin;

  if (!origin || allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', "true");
    res.header('Access-Control-Allow-Origin', origin);
  }
  next()
}

export { credentials }