import express, { IRouter } from "express";

import controller from "../../controllers/match.controller";

const router: IRouter = express.Router();

router.get("/:shareCode", controller.getMatchData);

export default router;
