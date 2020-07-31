import express, { IRouter } from "express";

import controller from "../../controllers/quickStats.controller";

const router: IRouter = express.Router();

router.get("/:steamID64", controller.getQuickStats);

export default router;
