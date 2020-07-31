import { Request, Response, NextFunction } from "express";
import axios from "axios";

import IQuickStats from "../interfaces/IQuickStats";
import makeQuickStats from "../helpers/makeQuickStats";

class quickStatsController {
  static getQuickStats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    let quickStats: IQuickStats = {
      winrate: null,
      kdRatio: null,
      adr: null,
      hsRate: null
    };

    const API_KEY = process.env.STEAM_API_KEY;
    const steamID64 = req.params.steamID64;
    const BASE_URL =
      "https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?appid=730";
    const URL = `${BASE_URL}&key=${API_KEY}&steamid=${steamID64}`;

    try {
      const response = await axios.get(URL);
      quickStats = makeQuickStats(response.data.playerstats.stats);
      res.json(quickStats);
    } catch (err) {
      return next({
        code: 404,
        message: "User does not exist according to STEAM WEB API"
      });
    }
  };
}

export default quickStatsController;
