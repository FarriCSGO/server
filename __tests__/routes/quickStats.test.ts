import axios from "axios";

test("/quickStats/{steamID64} for a valid SteamID to return non-null values", async () => {
  const response = await axios.get(
    "http://localhost:6969/api/quickStats/76561198893083379"
  );
  const returnedData = response.data;

  expect(returnedData.winrate).not.toBeNull();
  expect(returnedData.hltv).not.toBeNull();
  expect(returnedData.kdRatio).not.toBeNull();
  expect(returnedData.adr).not.toBeNull();
  expect(returnedData.hsRate).not.toBeNull();
});
