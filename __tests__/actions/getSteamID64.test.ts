import getSteamID64 from "../../src/actions/STEAM/getSteamID64.action";

test("getSteamID64() - get SteamID64 for a custom steam profile URL", async () => {
  return getSteamID64("stonecoldman").then((res) => {
    expect(res).toBe("76561198893083379");
  });
});

test(`getSteamID64() - get 'undefined' for invalid steam profile URL `, async () => {
  return getSteamID64("stonecoldman1").then((res) => {
    expect(res).toBe(undefined);
  });
});

test(`getSteamID64() - get 'undefined' for invalid steam profile URL `, async () => {
  return getSteamID64("stonecoldman1").then((res) => {
    expect(res).toBe(undefined);
  });
});
