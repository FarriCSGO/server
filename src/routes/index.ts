import express from "express";

// Import route handlers
import rootRouter from "./root";
import userSteamDetailsRouter from "./userSteamDetails";

const router = express.Router();

router.use("/api", rootRouter);
router.use("/api/userSteamDetails/", userSteamDetailsRouter);

export default router;
