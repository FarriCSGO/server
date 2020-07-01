import express, { IRouter } from 'express';
import controller from '../../controllers/userSteamDetails';

const router: IRouter = express.Router();

router.get('/profiles/:steam_id_64', controller.getDataBySteamID64);
router.get('/id/:profile_custom_url', controller.getDataByProfileCustomURL);

export default router;
