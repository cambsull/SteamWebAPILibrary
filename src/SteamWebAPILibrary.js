import 'dotenv/config';

class CallSteamAPI {
    static #baseURL = `http://api.steampowered.com`;

    constructor() {
        this.key = process.env.STEAM_KEY;
        try {
            const key = this.key;
            if (!key) {
                throw new Error('A Steam Web API key was not found.');
            }
            const keyRegex = /^[a-zA-Z0-9]{32}$/;
            if (!keyRegex.test(key)) {
                throw new Error('The Steam Web API key provided is invalid. It must be a 32-character alphanumeric string with no special characters.')
            }
        } catch (error) {
            console.error(`There was a problem instantiating the Steam Web API Library object: \n\n${error}\n`);
            return null;
        }
    }

    async getNewsForApp(appid, count = 3, maxlength = 300) {
        const url = `${CallSteamAPI.#baseURL}/ISteamNews/GetNewsForApp/v0002/?appid=${appid}&count=${count}&maxlength=${maxlength}&format=json`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.appnews.newsitems;
        } catch (error) {
            console.error('The server returned an error: ', error);
            return null;
        }
    }
    async getGlobalAchievementPercentagesForApp(gameid) {
        const url = `${CallSteamAPI.#baseURL}/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v002/?gameid=${gameid}&format=json`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.achievementpercentages.achievements;
        } catch (error) {
            console.error('The server returned an error: ', error)
            return null;
        }
    }
    async getPlayerSummaries(steamids) {
        const url = `${CallSteamAPI.#baseURL}/ISteamUser/GetPlayerSummaries/v0002/?key=${this.key}&steamids=${steamids}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.response.players;
        } catch (error) {
            console.error('The server returned an error: ', error)
            return null;
        }
    }
    async getFriendList(steamid, relationship = `friend`) {
        const url = `${CallSteamAPI.#baseURL}/ISteamUser/GetFriendList/v0001/?key=${this.key}&steamid=${steamid}&relationship=${relationship}&format=json`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.friendslist.friends;
        } catch (error) {
            console.error('The server returned an error: ', error)
            return null;
        }
    }
    async getPlayerAchievements(steamid, appid) {
        const url = `${CallSteamAPI.#baseURL}/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appid}&key=${this.key}&steamid=${steamid}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.playerstats;
        } catch (error) {
            console.error('The server returned an error: ', error)
            return null;
        }
    }
    async getUserStatsForGame(steamid, appid) {
        const url = `${CallSteamAPI.#baseURL}/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appid}&key=${this.key}&steamid=${steamid}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.playerstats;
        } catch (error) {
            console.error('The server returned an error: ', error)
            return null;
        }
    }
    async getOwnedGames(steamid, includeAppinfo = false, includePlayedFreeGames = false) {
        const includeAppInfoParam = includeAppinfo ? `&include_appinfo=true` : '';
        const includePlayedFreeGamesParam = includePlayedFreeGames ? `&include_played_free_games=true` : '';
        const url = `${CallSteamAPI.#baseURL}/IPlayerService/GetOwnedGames/v0001/?key=${this.key}&steamid=${steamid}${includeAppInfoParam}${includePlayedFreeGamesParam}&format=json`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.response.games;
        } catch (error) {
            console.error('The server returned an error: ', error)
            return null;
        }
    }
    async getRecentlyPlayedGames(steamid, count = null) {
        const countParam = count ? `&count=${count}` : '';
        const url = `${CallSteamAPI.#baseURL}/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${this.key}&steamid=${steamid}${countParam}&format=json`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('The server returned an error: ', error)
            return null;
        }
    }
}

export default CallSteamAPI;