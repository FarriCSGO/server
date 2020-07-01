import { Response, Request, NextFunction } from 'express';

import * as actions from '../actions/';
import { USER_STEAM_DETAILS } from '../entities';

class userSteamDetailsController {
  static async getDataBySteamID64(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    /* Declare an object `userSteamDetails` of type `USER_STEAM_DETAILS`
     * which will be returned as JSON data back to the client */
    let userSteamDetails: USER_STEAM_DETAILS = {
      name: 'Error: data missing',
      steam_level: 'Error: data missing',
      avatar_image_url: 'Error: data missing',
      online_status: 'Error: data missing',
      playing_game: undefined
    };

    try {
      // Fetch and set user's steam profile details
      userSteamDetails = await actions.STEAM.getUserSteamDetails(
        req.params.steam_id_64
      );

      // Throw an error if user does not exist in the steam's data base
      if (!userSteamDetails) {
        throw Error;
      }

      // Send client the JSON data
      res.json(userSteamDetails);
    } catch (error) {
      return next({
        code: 404,
        message: 'User does not exist according to STEAM WEB API'
      });
    }
  }

  static async getDataByProfileCustomURL(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    /* Declare an object `userSteamDetails` of type `USER_STEAM_DETAILS`
     * which will be returned as JSON data back to the client.
     */
    let userSteamDetails: USER_STEAM_DETAILS = {
      name: 'Error: data missing',
      steam_level: 'Error: data missing',
      avatar_image_url: 'Error: data missing',
      online_status: 'Error: data missing',
      playing_game: undefined
    };

    let steam_id_64 = '';

    // Fetch user's steam_id_64 to get user's steam profile details
    try {
      steam_id_64 = await actions.STEAM.getSteamID64(
        req.params.profile_custom_url
      );
    } catch (err) {
      return next({
        code: 404,
        message: 'User does not exist according to STEAM WEB API'
      });
    }

    try {
      // Fetch and set user's steam profile details
      userSteamDetails = await actions.STEAM.getUserSteamDetails(steam_id_64);

      // Throw an error if user does not exist in the steam's data base
      if (!userSteamDetails) {
        throw Error;
      }

      // Send client the JSON data
      res.json(userSteamDetails);
    } catch (error) {
      return next({
        code: 404,
        message: 'User does not exist according to STEAM WEB API'
      });
    }
  }
}

export default userSteamDetailsController;
