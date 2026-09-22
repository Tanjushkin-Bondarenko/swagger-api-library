import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import booksRouter from './router/books-router.js';
import { mongodbConnection } from './db/mongodbConnection.js'

const PORT = process.env.PORT || 4000;
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'A simple Express Library API',
    },
    servers: [{
      url: `http://localhost:${PORT}`,
    }]
  }, 
   apis: ['./router/*.js']
};

const specs = swaggerJsDoc(swaggerOptions);
const app = express();

app.disable('x-powered-by'); // Disable the 'X-Powered-By' header for security reasons

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
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
await mongodbConnection()

app.use(morgan('dev'));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.use('/books', booksRouter);