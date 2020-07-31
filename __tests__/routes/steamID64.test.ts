import axios from "axios";
import ISteamID64 from "../../src/interfaces/ISteamID64";

test("should return steam ID 64 of the given profileURL", async () => {
  const steamID64 = "76561198893083379";

  const response = await axios.get(
    "http://localhost:6969/api/steamID64/stonecoldman"
  );
  const recSteamID64 = response.data.steamID64;
  expect(recSteamID64).toBe(steamID64);
});
