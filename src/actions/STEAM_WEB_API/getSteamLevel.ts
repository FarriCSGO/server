import * as dotenv from "dotenv";
import axios from "axios";

// Get access .env file
dotenv.config();

async function getSteamLevel(steam_id: string): Promise<any> {
    /* Create the request URL path to hit the `STEAM WEB API` end-point
     * API_KEY - steam web API key
     * BASE_URL - end-point base url
     * STEAM_ID64 - steam id of the steam user
     * URL - complete request URL path */
    const API_KEY = process.env.STEAM_API_KEY;
    const BASE_URL =
        "https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/";
    const STEAM_ID64 = steam_id;
    const URL = `${BASE_URL}?key=${API_KEY}&steamid=${STEAM_ID64}`;

    try {
        const response = await axios.get(URL);
        // data - steam level of the user returned from STEAM WEB API
        const data: number = response.data.response.player_level;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export default getSteamLevel;
