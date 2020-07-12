import * as dotenv from 'dotenv';
import axios from 'axios';

import { IUserSteamDetails } from '../../interfaces';

// Get access .env file
dotenv.config();

async function getUserSteamDetails(steam_id: string): Promise<any> {
  /* Declare an object `userSteamDetails` of type `USER_STEAM_DETAILS`
   * which will be returned as JSON data back to the client.
   * steam_level - user's steam profile level */
  const userSteamDetails: IUserSteamDetails = {
    name: 'Error: data missing',
    steam_level: 'Error: data missing',
    avatar_image_url: 'Error: data missing',
    online_status: 'Error: data missing',
    playing_game: undefined
  };

  // API_KEY - steam web API key
  const API_KEY = process.env.STEAM_API_KEY;

  // STEAM_ID64 - steam id of the steam user
  const STEAM_ID64 = steam_id;

  /* Create the request URL path to hit the `STEAM WEB API` end-point
   * BASE_URL - end-point base url to get user's steam level
   * URL - complete request URL path */
  let BASE_URL =
    'https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/';
  let URL = `${BASE_URL}?key=${API_KEY}&steamid=${STEAM_ID64}`;

  try {
    const response = await axios.get(URL);

    // set user's steam profile level
    userSteamDetails.steam_level = response.data.response.player_level;
  } catch (err) {
    throw new Error('Invalid Steam_ID64 ' + STEAM_ID64);
  }

  /* Create the request URL path to hit the `STEAM WEB API` end-point
   * BASE_URL - end-point base url to get user's steam profile summary
   * URL - complete request URL path */
  BASE_URL = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/';
  URL = `${BASE_URL}?key=${API_KEY}&steamids=${STEAM_ID64}`;

  try {
    const response = await axios.get(URL);

    // data - JSON data returned from STEAM WEB API
    const data = response.data;

    // set user's steam name
    userSteamDetails.name = data.response.players[0].personaname;

    // set user's steam profile avatar image
    userSteamDetails.avatar_image_url = data.response.players[0].avatarfull;

    // set user's online stats (online, offline, away, busy, etc)
    userSteamDetails.online_status = data.response.players[0].personastate;

    // if user is online and in game, set the game user is playing
    if (
      data.response.players[0].gameextrainfo &&
      userSteamDetails.online_status !== 0
    ) {
      userSteamDetails.playing_game = data.response.players[0].gameextrainfo;
    }
    return userSteamDetails;
  } catch (err) {
    throw new Error('Invalid Steam_ID64 ' + STEAM_ID64);
  }
}

export default getUserSteamDetails;
