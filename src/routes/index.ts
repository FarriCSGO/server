import express from "express";

// Route handlers
import userSteamDetailsRouter from "./api/userSteamDetails";
import steamID64Router from "./api/steamID64";

const router = express.Router();

router.use("/api/userSteamDetails/", userSteamDetailsRouter);
router.use("/api/steamID64/", steamID64Router);

export default router;
