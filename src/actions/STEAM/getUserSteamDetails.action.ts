import * as dotenv from "dotenv";
import axios from "axios";

import IUserSteamDetails from "../../interfaces/IUserSteamDetails";

dotenv.config();

const getUserSteamDetails = async (steamID64: string): Promise<any> => {
  const userSteamDetails: IUserSteamDetails = {
    name: null,
    steamID64: null,
    steamLevel: null,
    avatarImageURL: null,
    onlineStatus: null,
    playingGame: null
  };

  const API_KEY = process.env.STEAM_API_KEY;

  let BASE_URL =
    "https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/";
  let URL = `${BASE_URL}?key=${API_KEY}&steamid=${steamID64}`;

  try {
    const response = await axios.get(URL);

    userSteamDetails.steamLevel = response.data.response.player_level;
  } catch (err) {
    throw new Error("Invalid steamID64 " + steamID64);
  }

  BASE_URL = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/";
  URL = `${BASE_URL}?key=${API_KEY}&steamids=${steamID64}`;

  try {
    const response = await axios.get(URL);
    const data = response.data;

    userSteamDetails.steamID64 = steamID64;
    userSteamDetails.name = data.response.players[0].personaname;
    userSteamDetails.avatarImageURL = data.response.players[0].avatarfull;
    userSteamDetails.onlineStatus = data.response.players[0].personastate;

    const gameName = data.response.players[0].gameextrainfo;
    const onlineStatus = userSteamDetails.onlineStatus !== 0;

    if (gameName && onlineStatus) {
      userSteamDetails.playingGame = gameName;
    }

    return userSteamDetails;
  } catch (err) {
    throw new Error("Invalid Steam_ID64 " + steamID64);
  }
};

export default getUserSteamDetails;
