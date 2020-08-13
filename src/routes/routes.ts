import express, { Response, Request, NextFunction, IRouter } from "express";
import { csgoClient } from "../server";

// Route handlers
import userSteamDetailsRouter from "./api/userSteamDetails.router";
import steamID64Router from "./api/steamID64.router";
import quickStatsRouter from "./api/quickStats.router";

const router = express.Router();

router.use("/api/userSteamDetails/", userSteamDetailsRouter);
router.use("/api/steamID64/", steamID64Router);
router.use("/api/quickStats", quickStatsRouter);

router.get("/api/csgo", (req: Request, res: Response, next: NextFunction) => {
  console.log("WORKING");

  const matchID = "3427254290832425251";
  const outcomeID = "3427259489890337070";
  const tokenID = 57904;

  let data;

  csgoClient.launch();
  // TODO: Launch csgoClient in server.ts and have ready event handler here

  csgoClient.on("ready", function test() {
    console.log("LOL");
    csgoClient.requestGame(matchID, outcomeID, tokenID);
    csgoClient.on("matchList", function lol(resp) {
      console.log(resp);
      data = resp;
      res.json(data);
      csgoClient.removeListener("matchList", lol);
    });

    csgoClient.exit();
    console.log("LOL AGAIN");
    csgoClient.removeListener("ready", test);
  });
});

export default router;
