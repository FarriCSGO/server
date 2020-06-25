import { Response, Request, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

import * as actions from '../actions/';
import { USER_STEAM_DETAILS } from '../entities';

class userSteamDetailsController {
  static async getDataBySteamID64(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    /* Declare an object `userSteamDetails` of type `USER_STEAM_DETAILS`
     * which will be returned as JSON data back to the client.
     * steam_level - user's steam profile level */
    const userSteamDetails: USER_STEAM_DETAILS = {
      steam_id_64: 'Error: data missing',
      community_visibility_state: 'Error: data missing',
      name: 'Error: data missing',
      steam_level: 'Error: data missing',
      avatar_image_url: 'Error: data missing',
      last_log_off: 'Error: data missing',
      online_status: 'Error: data missing'
    };

    try {
      // fetch and set user's steam profile level
      userSteamDetails.steam_level = await actions.getSteamLevel(
        req.params.steam_id_64
      );
      if (!userSteamDetails.steam_level) {
        throw Error;
      }
    } catch (error) {
      return next({
        code: 404,
        message: 'User does not exist according to STEAM WEB API'
      });
    }

    // Get to access .env file
    dotenv.config();

    /* Create the request URL path to hit the `STEAM WEB API` end-point
     * API_KEY - steam web API key
     * BASE_URL - end-point base url
     * STEAM_ID64 - steam id of the steam user
     * URL - complete request URL path */
    const API_KEY = process.env.STEAM_API_KEY;
    const BASE_URL =
      'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/';
    const STEAM_ID64 = req.params.steam_id_64;
    const URL = `${BASE_URL}?key=${API_KEY}&steamids=${STEAM_ID64}`;

    try {
      const response = await axios.get(URL);
      if (!response.data.response.players[0]) {
        throw Error;
      }
      // data - JSON data returned from STEAM WEB API
      const data = response.data;

      // set user's steamID64
      userSteamDetails.steam_id_64 = data.response.players[0].steamid;

      // set user's steam name
      userSteamDetails.name = data.response.players[0].personaname;

      // set user's profile visibility status (public, private, friends)
      userSteamDetails.community_visibility_state =
        data.response.players[0].communityvisibilitystate;

      // set user's steam profile avatar image
      userSteamDetails.avatar_image_url = data.response.players[0].avatarfull;

      // set the time when the user was last online
      userSteamDetails.last_log_off = data.response.players[0].lastlogoff;

      // set user's online stats (online, offline, away, busy, etc)
      userSteamDetails.online_status = data.response.players[0].personastate;

      // if user is online and in game, set the game user is playing
      if (
        data.response.players[0].gameextrainfo &&
        userSteamDetails.online_status !== 0
      ) {
        userSteamDetails.playing_game = data.response.players[0].gameextrainfo;
      }

      // send the USER_STEAM_DETAILS object to the client
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
     * steam_level - user's steam profile level */
    const userSteamDetails: USER_STEAM_DETAILS = {
      steam_id_64: 'Error: data missing',
      community_visibility_state: 'Error: data missing',
      name: 'Error: data missing',
      steam_level: 'Error: data missing',
      avatar_image_url: 'Error: data missing',
      last_log_off: 'Error: data missing',
      online_status: 'Error: data missing'
    };

    try {
      // fetch user's steam_id_64 to get more user details
      userSteamDetails.steam_id_64 = await actions.getSteamID64(
        req.params.profile_custom_url
      );
      // console.log("GOT THE STEAM ID", userSteamDetails.steam_id_64);
      if (!userSteamDetails.steam_id_64) {
        throw Error;
      }
    } catch (error) {
      return next({
        code: 404,
        message: 'User does not exist according to STEAM WEB API'
      });
    }

    try {
      // fetch and set user's steam profile level
      userSteamDetails.steam_level = await actions.getSteamLevel(
        userSteamDetails.steam_id_64
      );
      // console.log("got steam level", userSteamDetails.steam_level);
      if (userSteamDetails.steam_level === undefined) {
        throw Error;
      }
    } catch (error) {
      return next({
        code: 404,
        message: 'User does not exist according to STEAM WEB API'
      });
    }

    // Get to access .env file
    dotenv.config();

    /* Create the request URL path to hit the `STEAM WEB API` end-point
     * API_KEY - steam web API key
     * BASE_URL - end-point base url
     * STEAM_ID64 - steam id of the steam user
     * URL - complete request URL path */
    const API_KEY = process.env.STEAM_API_KEY;
    const BASE_URL =
      'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/';
    const STEAM_ID64 = userSteamDetails.steam_id_64;
    const URL = `${BASE_URL}?key=${API_KEY}&steamids=${STEAM_ID64}`;

    try {
      const response = await axios.get(URL);

      if (!response.data.response.players[0]) {
        throw Error;
      }
      // console.log("GOT remaining steam details");

      // data - JSON data returned from STEAM WEB API
      const data = response.data;

      // set user's steam name
      userSteamDetails.name = data.response.players[0].personaname;

      // set user's profile visibility status (public, private, friends)
      userSteamDetails.community_visibility_state =
        data.response.players[0].communityvisibilitystate;

      // set user's steam profile avatar image
      userSteamDetails.avatar_image_url = data.response.players[0].avatarfull;

      // set the time when the user was last online
      userSteamDetails.last_log_off = data.response.players[0].lastlogoff;

      // set user's online stats (online, offline, away, busy, etc)
      userSteamDetails.online_status = data.response.players[0].personastate;

      // if user is online and in game, set the game user is playing
      if (
        data.response.players[0].gameextrainfo &&
        userSteamDetails.online_status !== 0
      ) {
        userSteamDetails.playing_game = data.response.players[0].gameextrainfo;
      }

      // send the USER_STEAM_DETAILS object to the client
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
