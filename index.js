import callSteamAPI from "./src/SteamWebAPILibrary.js";

const steamAPIClient = new callSteamAPI();

const result = await steamAPIClient.getNewsForApp({
  appid: 440,
  count: 3,
  maxlength: 300,
  format: "json",
  specificData: null,
});

const result2 = await steamAPIClient.getNewsForApp({
  appid: 440,
  count: 3,
  maxlength: 300,
  format: "json",
  specificData: null,
});
