import express from "express";

// Import route handlers
import userSteamDetailsRouter from "./api/userSteamDetails";

const router = express.Router();

router.use("/api/userSteamDetails/", userSteamDetailsRouter);

export default router;
