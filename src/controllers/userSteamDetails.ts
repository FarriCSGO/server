import { Response, Request, NextFunction } from "express";

import * as actions from "../actions/";
import { IUserSteamDetails } from "../interfaces";

class userSteamDetailsController {
  static getDataBySteamID64 = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    let userSteamDetails: IUserSteamDetails = {
      name: "Error: data missing",
      steamID64: "Error: data missing",
      steamLevel: "Error: data missing",
      avatarImageURL: "Error: data missing",
      onlineStatus: "Error: data missing",
      playingGame: undefined
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
      name: "Error: data missing",
      steamID64: "Error: data missing",
      steamLevel: "Error: data missing",
      avatarImageURL: "Error: data missing",
      onlineStatus: "Error: data missing",
      playingGame: undefined
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
