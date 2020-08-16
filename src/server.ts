import mongoose from "mongoose";
import { app } from "./app";
import * as dotenv from "dotenv";
import Steam from "steam";
import csgo from "csgo";

dotenv.config();

const steamClient = new Steam.SteamClient();
const steamUser = new Steam.SteamUser(steamClient);
const steamGC = new Steam.SteamGameCoordinator(steamClient, 730);

export const csgoClient = new csgo.CSGOClient(steamUser, steamGC, true);

const PORT: string | number = process.env.PORT || 8080;
const MONGODB_URL = process.env.MONGO_DB_URL;

// Connect to mongoDB Atlas DB and `then` start server
mongoose
  .connect(MONGODB_URL!, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.info("Connected to MongoDB");
      console.info(`Server started at http://localhost:${PORT}`);

      steamClient.connect();
      steamClient.on("connected", function () {
        steamUser.logOn({
          account_name: "nitroxbot",
          password: "krishna@1234"
        });
      });

      steamClient.on("logOnResponse", (response) => {
        if (response.eresult === Steam.EResult.OK) {
          console.log("Login success.");
        } else {
          console.log("Login failure.");
          console.log(response);
          process.exit(1);
        }
      });
    })
  )
  .catch((error) => console.log(error));
