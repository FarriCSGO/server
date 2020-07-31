import express from "express";

// Route handlers
import userSteamDetailsRouter from "./api/userSteamDetails.router";
import steamID64Router from "./api/steamID64.router";
import quickStatsRouter from "./api/quickStats.router";

const router = express.Router();

router.use("/api/userSteamDetails/", userSteamDetailsRouter);
router.use("/api/steamID64/", steamID64Router);
router.use("/api/quickStats", quickStatsRouter);

export default router;
