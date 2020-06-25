import { app } from "./app";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8080;

// Start server

app.listen(PORT, () =>
    console.info(`Server started at http://localhost:${PORT}`)
);
