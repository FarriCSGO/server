import express, { IRouter, Request, Response } from "express";
import { getUserSteamLevel } from "../actions/";
import { USER_STEAM_DETAILS } from "../entities";

const router: IRouter = express.Router();

router.get("/:steam_id_64", (req: Request, res: Response) => {
    // TODO: ean up the steamLevel() function by creating a controller instead
    async function steamLevel() {
        /* Declare an object `userSteamDetails` of type `USER_STEAM_DETAILS`
         * which will be returned as JSON data back to the client.
         * steam_level - user's steam profile level */
        const userSteamDetails: USER_STEAM_DETAILS = {
            communityi_visibility_state: "Error: data missing",
            name: "Error: data missing",
            current_status: "Error: data missing",
            steam_level: "Error: data missing",
            avatar_image_url: "Error: data missing",
        };

        try {
            userSteamDetails.steam_level = await getUserSteamLevel(
                req.params.steam_id_64
            );
            if (userSteamDetails.steam_level !== undefined) {
                const jsonData = JSON.stringify(userSteamDetails);
                res.send(`${jsonData}`);
            }
            const jsonUser = JSON.stringify(userSteamDetails);
            res.send(jsonUser);
        } catch (error) {}
    }
    steamLevel();
});

export default router;
