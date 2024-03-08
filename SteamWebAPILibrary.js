import 'dotenv/config';
import process from 'process';

class CallSteamAPI {
    static baseURL = `http://api.steampowered.com`;
    constructor() {
        this.key = process.env.STEAM_KEY;
    }
    async getNewsForApp(appid, count = 3, maxlength = 300) {
        const url = `${CallSteamAPI.baseURL}/ISteamNews/GetNewsForApp/v0002/?appid=${appid}&count=${count}&maxlength=${maxlength}&format=json`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.appnews.newsitems;
        } catch (error) {
            console.error('The server returned an error. Did you specify a valid app id? ', error);
        }
    }
    async getGlobalAchievementPercentagesForApp(gameid) {
        const url = `${CallSteamAPI.baseURL}/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v002/?gameid=${gameid}&format=json`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.achievementpercentages.achievements;
        } catch (error) {
            console.error('The server returned an error. Did you specify a valid game id? ', error)
        }
    }
    async getPlayerSummaries(steamids) {
        const url = `${CallSteamAPI.baseURL}/ISteamUser/GetPlayerSummaries/v0002/?key=${this.key}&steamids=${steamids}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.response.players;
        } catch (error) {
            console.error('The server returned an error. Did you specify a valid list of Steam IDs in ONE string, separated by commas? ', error)
        }
    }
    async getFriendList(steamid, relationship = `friend`) {
        const url = `${CallSteamAPI.baseURL}/ISteamUser/GetFriendList/v0001/?key=${this.key}&steamid=${steamid}&relationship=${relationship}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.friendslist.friends;
        } catch (error) {
            console.error('The server returned an error. Did you specify a valid steam id? ', error)
        }
    }
    async getPlayerAchievements(steamid, appid) {
        const url = `${CallSteamAPI.baseURL}/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appid}&key=${this.key}&steamid=${steamid}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.playerstats;
        } catch (error) {
            console.error('The server returned an error. Did you specify a valid Steam ID and app ID? ', error)
        }
    }
    async getUserStatsForGame(steamid, appid) {
        const url = `${CallSteamAPI.baseURL}/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appid}&key=${this.key}&steamid=${steamid}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.playerstats;
        } catch (error) {
            console.error('The server returned an error. Did you specify a valid Steam ID and app ID? ', error)
        }
    }
    async getOwnedGames(steamid, includeAppinfo = false, includePlayedFreeGames = false) {
        const includeAppInfoParam = includeAppinfo ? `&include_appinfo=true` : '';
        const includePlayedFreeGamesParam = includePlayedFreeGames ? `&include_played_free_games=true` : '';
        const url = `${CallSteamAPI.baseURL}/IPlayerService/GetOwnedGames/v0001/?key=${this.key}&steamid=${steamid}${includeAppInfoParam}${includePlayedFreeGamesParam}&format=json`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.response.games;
        } catch (error) {
            console.error('The server returned an error. Did you specify a valid Steam ID? ', error)
        }
    }
    async getRecentlyPlayedGames(steamid, count = null) {
        const countParam = count ? `&count=${count}` : '';

        const url = `${CallSteamAPI.baseURL}/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${this.key}&steamid=${steamid}${countParam}&format=json`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('The server returned an error. Did you specify a valid Steam ID? ', error)
        }
    }
}

export default CallSteamAPI;