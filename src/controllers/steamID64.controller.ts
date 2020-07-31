import { Request, Response, NextFunction } from "express";

import * as actions from "../actions";
import ISteamID64 from "../interfaces/ISteamID64";

class steamID64Controller {
  static getSteamID64 = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const steamID64: ISteamID64 = {
      steamID64: null
    };

    const customID = req.params.customID;

    try {
      steamID64.steamID64 = await actions.steam.getSteamID64(customID);

      if (steamID64.steamID64 === undefined) {
        return next({
          code: 404,
          message: "User does not exist according to STEAM WEB API"
        });
      }

      res.json(steamID64);
    } catch (error) {
      console.error(error);
    }
  };
}

export default steamID64Controller;
