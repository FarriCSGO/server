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

// Enabling CORS to allow client(deployed) to make API request
let ORIGIN: string;

process.env.NODE_ENV === "production"
  ? (ORIGIN = "https://farri.netlify.app")
  : (ORIGIN = "http://localhost:3000");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", ORIGIN);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Route the request correctly based on the end-point
app.use(routes);

// Handle errors
app.use(errorHandler);

export { app };
