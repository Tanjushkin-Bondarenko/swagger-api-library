import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { JSONFilePreset } from 'lowdb/node'

const PORT = process.env.PORT || 4000;
const defaultData = { books: [] };
const db = await JSONFilePreset('db.json', defaultData);
const app = express();
app.disable('x-powered-by'); // Disable the 'X-Powered-By' header for security reasons
app.db = db;
const allowedOrigins = new Set(
  (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Origin not allowed by CORS'));
  },
}));
app.use(express.json());
app.use(morgan('dev'));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})