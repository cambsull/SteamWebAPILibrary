import CallSteamAPI from "../src/SteamWebAPILibrary";
import { jest } from "@jest/globals";
test("Smoke Test", async () => {
  const steamAPIClient = new CallSteamAPI();
  const result = await steamAPIClient.getNewsForApp({
    appid: 440,
    count: 3,
    maxlength: 300,
    format: "json",
    specificData: null,
  });
});

const testCases = [
  [
    "getNewsForApp",
    {
      appid: 440,
      count: 3,
      maxlength: 300,
      format: "json",
      specificData: null,
    },
  ],
  [
    "getGlobalAchievementPercentagesForApp",
    {
      gameid: 440,
    },
  ],
  [
    "getPlayerSummaries",
    {
      steamids: "76561198040604194",
    },
  ],
  [
    "getFriendList",
    {
      steamid: "76561198040604194",
      relationship: "friend",
    },
  ],
  [
    "getPlayerAchievements",
    {
      steamid: "76561198040604194",
      appid: 440,
    },
  ],
  [
    "getUserStatsForGame",
    {
      steamid: "76561198040604194",
      appid: 440,
    },
  ],
  [
    "getOwnedGames",
    {
      steamid: "76561198040604194",
    },
  ],
  [
    "getRecentlyPlayedGames",
    {
      steamid: "76561198040604194",
    },
  ],
];

describe.each(testCases)("%s", (functionName, functionArgs) => {
  let steamAPIClient;
  let spyHas;
  let spySet;
  let spyGet;

  beforeAll(() => {
    steamAPIClient = new CallSteamAPI();
    spyHas = jest.spyOn(steamAPIClient.cache, "has");

    spySet = jest.spyOn(steamAPIClient.cache, "set");

    spyGet = jest.spyOn(steamAPIClient.cache, "get");
  });

  afterEach(() => {
    spyHas.mockClear();
    spySet.mockClear();
    spyGet.mockClear();
  });

  test("misses cache, and sets it", async () => {
    await steamAPIClient[functionName](functionArgs);
    expect(spyHas).toHaveBeenCalled();
    expect(spySet).toHaveBeenCalled();
    expect(spyGet).not.toHaveBeenCalled();
  });
  test("hits cache", async () => {
    await steamAPIClient[functionName](functionArgs);
    expect(spyHas).toHaveBeenCalled();
    expect(spyGet).toHaveBeenCalled();
    expect(spySet).not.toHaveBeenCalled();
  });

  test("does not hit cache when useCache is false", async () => {
    await steamAPIClient[functionName]({ ...functionArgs, useCache: false });
    expect(spyHas).not.toHaveBeenCalled();
    expect(spySet).not.toHaveBeenCalled();
    expect(spyGet).not.toHaveBeenCalled();
  });
});
