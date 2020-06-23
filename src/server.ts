import { app } from "./app";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGODB_URL = process.env.MONGODB_URL;

// Connect to mongoDB Atlas DB and `then` start server
mongoose
    .connect(MONGODB_URL!, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        app.listen(PORT, () => {
            console.info("Connected to MongoDB");
            console.info(`Server started at http://localhost:${PORT}`);
        })
    )
    .catch((error) => console.log(error));
