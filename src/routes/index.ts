import express from "express";

// Route handlers
import userSteamDetailsRouter from "./api/userSteamDetails";
import quotesByProsRouter from "./api/quotesByPros";

const router = express.Router();

router.use("/api/userSteamDetails/", userSteamDetailsRouter);
router.use("/api/quotesByPros", quotesByProsRouter);

export default router;
