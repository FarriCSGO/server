import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const getSteamID64 = async (profileCustomURL: string): Promise<any> => {
  const API_KEY = process.env.STEAM_API_KEY;
  const BASE_URL =
    'https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/';
  const PROFILE_CUSTOM_URL = profileCustomURL;
  const URL = `${BASE_URL}?key=${API_KEY}&vanityurl=${PROFILE_CUSTOM_URL}`;

  try {
    const response = await axios.get(URL);
    const steamID64 = response.data.response.steamid;
    return steamID64;
  } catch (error) {
    throw new Error('Invalid profileCustomURL ' + profileCustomURL);
  }
};

export default getSteamID64;
