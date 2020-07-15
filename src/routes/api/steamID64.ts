import express, { IRouter } from "express";

import controller from "../../controllers/steamID64";

const router: IRouter = express.Router();

router.get("/:customID", controller.getSteamID64);

export default router;
