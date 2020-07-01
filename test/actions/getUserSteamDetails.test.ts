import getUserSteamDetails from '../../src/actions/STEAM/getUserSteamDetails';
import { USER_STEAM_DETAILS } from '../../src/entities';

// Steam details of my really old account that I haven't used in years. This
// makes it perfect to use this data for this test.
const steamUser: USER_STEAM_DETAILS = {
  name: 'I am retarded',
  steam_level: 54,
  avatar_image_url:
    'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/49/4903f580b21e385a35b1f4b61ce5771ab9ec0bb5_full.jpg',
  online_status: 0,
  playing_game: undefined
};

// This test will fail if STEAM decides to change the URL of the avatar, rest
// everything should remain the same.
test(`getUserSteamDetails() - get user's steam profile details `, async () => {
  const avatar_image_url =
    'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/49/4903f580b21e385a35b1f4b61ce5771ab9ec0bb5_full.jpg';
  return getUserSteamDetails('76561198452636338').then((res) => {
    expect(res.name).toBe(steamUser.name);
    expect(res.steam_level).toBe(steamUser.steam_level);
    expect(res.avatar_image_url).toBe(steamUser.avatar_image_url);
    expect(res.online_status).toBe(steamUser.online_status);
    expect(res.playing_game).toBe(steamUser.playing_game);
  });
});

test(`getUserSteamDetails() - throw an Error for invalid steamID64`, async () => {
  const invalidSteamID = '7656198452636338';

  return getUserSteamDetails(invalidSteamID).catch((err) =>
    expect(err.message).toBe('Invalid Steam_ID64 ' + invalidSteamID)
  );
});
