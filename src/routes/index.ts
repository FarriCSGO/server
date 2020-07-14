import express from "express";

// Route handlers
import userSteamDetailsRouter from "./api/userSteamDetails";

const router = express.Router();

router.use("/api/userSteamDetails/", userSteamDetailsRouter);

export default router;
