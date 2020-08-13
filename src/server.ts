import { app } from "./app";
import * as dotenv from "dotenv";
import Steam = require("steam");
import csgo = require("csgo");

dotenv.config();

const steamClient = new Steam.SteamClient();
const steamUser = new Steam.SteamUser(steamClient);
const steamGC = new Steam.SteamGameCoordinator(steamClient, 730);

export const csgoClient = new csgo.CSGOClient(steamUser, steamGC, true);

const PORT: string | number = process.env.PORT || 8080;

app.listen(PORT, () => {
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
});
