import express, { Application, Request, Response, NextFunction } from 'express'; 

import { requestLogger } from './middleware/request.logger';
import routes from './routes'

// Initialize ExpressJS `app`
const app: Application = express();

// Middlewares 
// Parse incoming requests
app.use(express.json);

// Log every request to the console that was sent to the server
app.use(requestLogger);

// Route the request appropriately based on the end-point
app.use(routes);

export { app };