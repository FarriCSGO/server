import { app } from "./app";
import * as dotenv from "dotenv";

dotenv.config();

const PORT: string | number = process.env.PORT || 8080;

app.listen(PORT, () =>
  console.info(`Server started at http://localhost:${PORT}`)
);
