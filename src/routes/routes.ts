import express, { Response, Request, NextFunction, IRouter } from "express";
import { csgoClient } from "../server";

// Route handlers
import userSteamDetailsRouter from "./api/userSteamDetails.router";
import steamID64Router from "./api/steamID64.router";
import quickStatsRouter from "./api/quickStats.router";
import matchRouter from "./api/match.router";

const router = express.Router();

router.use("/api/userSteamDetails/", userSteamDetailsRouter);
router.use("/api/steamID64/", steamID64Router);
router.use("/api/quickStats", quickStatsRouter);
router.use("/api/match", matchRouter);

export default router;
