import express from "express";

// Import route handlers
import rootRouter from "./root";
import userSteamDetailsByIDRouter from "./userSteamDetailsById";

const router = express.Router();

router.use("/api", rootRouter);
router.use("/api/userSteamDetails/id", userSteamDetailsByIDRouter);

export default router;
