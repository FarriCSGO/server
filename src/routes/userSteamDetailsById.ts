import express, { IRouter, Request, Response } from "express";

import { getSteamLevel } from "../controllers/STEAM_WEB_API/getSteamLevel";
import { USER_STEAM_DETAILS } from "../entities/USER_STEAM_DETAILS";

const router: IRouter = express.Router();

router.get("/:steam_id_64", (req: Request, res: Response) => {
    async function steamLevel() {
        /* Declare an object `userSteamDetails` of type `USER_STEAM_DETAILS`
         * which will be returned as JSON data back to the client.
         * steam_level - user's steam profile level */
        const userSteamDetails: USER_STEAM_DETAILS = {
            steam_level: 0,
        };

        userSteamDetails.steam_level = await getSteamLevel(
            req.params.steam_id_64
        );
        const jsonData = await JSON.stringify(userSteamDetails);
        res.send(`${jsonData}`);
    }
    steamLevel();
});

export default router;
