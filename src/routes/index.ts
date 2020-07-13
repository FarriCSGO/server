import express from "express";

// Import route handlers
import userSteamDetailsRouter from "./api/userSteamDetails";
import homeRoute from "./homeRoute";

const router = express.Router();

router.use("/api/userSteamDetails/", userSteamDetailsRouter);
router.use("/", homeRoute);

export default router;
