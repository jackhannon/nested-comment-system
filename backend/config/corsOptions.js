const allowedOrigins = [
  'http://127.0.0.1:5500',
  'http://localhost:5173',
  'http://localhost:5000'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};


export default { corsOptions }