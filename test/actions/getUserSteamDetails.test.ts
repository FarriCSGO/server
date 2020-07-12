import getUserSteamDetails from "../../src/actions/STEAM/getUserSteamDetails";
import { IUserSteamDetails } from "../../src/interfaces";

// Steam details of my really old account that I haven't used in years. This
// makes it perfect to use this data for this test.
const steamUser: IUserSteamDetails = {
  name: "I am retarded",
  steamID64: "76561198452636338",
  steamLevel: 54,
  avatarImageURL:
    "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/49/4903f580b21e385a35b1f4b61ce5771ab9ec0bb5_full.jpg",
  onlineStatus: 0,
  playingGame: undefined
};

// This test will fail if STEAM decides to change the URL of the avatar, rest
// everything should remain the same.
test(`getUserSteamDetails() - get user's steam profile details `, async () => {
  const avatar_image_url =
    "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/49/4903f580b21e385a35b1f4b61ce5771ab9ec0bb5_full.jpg";
  return getUserSteamDetails("76561198452636338").then((res) => {
    expect(res.name).toBe(steamUser.name);
    expect(res.steamID64).toBe(steamUser.steamID64);
    expect(res.steamLevel).toBe(steamUser.steamLevel);
    expect(res.avatarImageURL).toBe(steamUser.avatarImageURL);
    expect(res.onlineStatus).toBe(steamUser.onlineStatus);
    expect(res.playingGame).toBe(steamUser.playingGame);
  });
});

test(`getUserSteamDetails() - throw an Error for invalid steamID64`, async () => {
  const invalidSteamID = "7656198452636338";

  return getUserSteamDetails(invalidSteamID).catch((err) =>
    expect(err.message).toBe("Invalid steamID64 " + invalidSteamID)
  );
});
