import { app } from "./app";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const MONGO_DB_URL: string | any = process.env.MONGO_DB_URL;
const PORT: string | number = process.env.PORT || 8080;

mongoose
  .connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.info("Connected to MongoDB"))
  .catch((error) => console.error(error));

app.listen(PORT, () =>
  console.info(`Server started at http://localhost:${PORT}`)
);
