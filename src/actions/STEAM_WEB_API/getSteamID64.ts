import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';

// Get access to .env file
dotenv.config();

async function getSteamID64(profile_custom_url: string): Promise<any> {
  /* Create the request URL path to hit the `STEAM WEB API` end-point
   * API_KEY - steam web API key
   * BASE_URL - end-point base url
   * PROFILE_CUSTOM_URL - user custom community profile url
   * URL - complete request URL path */

  const API_KEY = process.env.STEAM_API_KEY;
  const BASE_URL =
    'https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/';
  const PROFILE_CUSTOM_URL = profile_custom_url;
  const URL = `${BASE_URL}?key=${API_KEY}&vanityurl=${PROFILE_CUSTOM_URL}`;

  try {
    const response = await axios.get(URL);
    const data = response.data.response.steamid;
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default getSteamID64;
