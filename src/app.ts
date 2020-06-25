import express, { Application } from 'express';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

import routes from './routes';
import errorHandler from './middleware/errorHandler';

// Initialize ExpressJS `app`
const app: Application = express();

// Parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log every request to the console that was sent to the server
app.use(morgan('dev'));

// log all requests to ../access.log
app.use(
  morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, '../', 'access.log'), {
      flags: 'a'
    })
  })
);

// Route the request correctly based on the end-point
app.use(routes);

// Handle errors
app.use(errorHandler);

export { app };
