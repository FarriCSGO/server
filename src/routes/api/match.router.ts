import express, { IRouter } from "express";

import controller from "../../controllers/match.controller";

const router: IRouter = express.Router();

router.post("/", controller.getMatchData);

export default router;
