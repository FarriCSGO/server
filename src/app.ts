import express, { Application } from "express";

import requestLogger from "./middleware/requestLogger";
import routes from "./routes";
import errorHandler from "./middleware/errorHandler";

// Initialize ExpressJS `app`
const app: Application = express();

// Parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log every request to the console that was sent to the server
app.use(requestLogger);

// Route the request correctly based on the end-point
app.use(routes);

// Handle errors
app.use(errorHandler);

export { app };
