import express, { IRouter } from "express";
import controller from "../../controllers/userSteamDetails";

const router: IRouter = express.Router();

router.get("/profiles/:steamID64", controller.getDataBySteamID64);
router.get("/id/:profileCustomURL", controller.getDataByProfileCustomURL);

export default router;
