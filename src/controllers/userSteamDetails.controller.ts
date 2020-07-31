import { Response, Request, NextFunction } from "express";

import * as actions from "../actions";
import IUserSteamDetails from "../interfaces/IUserSteamDetails";

class userSteamDetailsController {
  static getDataBySteamID64 = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    let userSteamDetails: IUserSteamDetails = {
      name: null,
      steamID64: null,
      steamLevel: null,
      avatarImageURL: null,
      onlineStatus: null,
      playingGame: null
    };

    const steamID64 = req.params.steamID64;

    try {
      userSteamDetails = await actions.steam.getUserSteamDetails(steamID64);

      if (!userSteamDetails) {
        throw Error;
      }

      res.json(userSteamDetails);
    } catch (error) {
      return next({
        code: 404,
        message: "User does not exist according to STEAM WEB API"
      });
    }
  };

  static getDataByProfileCustomURL = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    let userSteamDetails: IUserSteamDetails = {
      name: null,
      steamID64: null,
      steamLevel: null,
      avatarImageURL: null,
      onlineStatus: null,
      playingGame: null
    };

    let steamID64: string;
    const profileCustomURL = req.params.profileCustomURL;

    try {
      steamID64 = await actions.steam.getSteamID64(profileCustomURL);
    } catch (err) {
      return next({
        code: 404,
        message: "User does not exist according to STEAM WEB API"
      });
    }

    try {
      userSteamDetails = await actions.steam.getUserSteamDetails(steamID64);

      if (!userSteamDetails) {
        throw Error;
      }

      res.json(userSteamDetails);
    } catch (error) {
      return next({
        code: 404,
        message: "User does not exist according to STEAM WEB API"
      });
    }
  };
}

export default userSteamDetailsController;
