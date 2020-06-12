import express, { Application } from 'express'; 

import { requestLogger } from './middleware/requestLogger';
import routes from './routes'

// Initialize ExpressJS `app`
const app: Application = express();

// Middlewares 
// Parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log every request to the console that was sent to the server
app.use(requestLogger);

// Route the request appropriately based on the end-point
app.use(routes);

export { app };
