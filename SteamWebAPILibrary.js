import 'dotenv/config';

class CallSteamAPI {
    static #baseURL = `http://api.steampowered.com`;
    static #key = process.env.STEAM_KEY;

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
        const url = `${CallSteamAPI.#baseURL}/ISteamUser/GetPlayerSummaries/v0002/?key=${CallSteamAPI.#key}&steamids=${steamids}`;
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
        const url = `${CallSteamAPI.#baseURL}/ISteamUser/GetFriendList/v0001/?key=${CallSteamAPI.#key}&steamid=${steamid}&relationship=${relationship}`;
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
        const url = `${CallSteamAPI.#baseURL}/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appid}&key=${CallSteamAPI.#key}&steamid=${steamid}`;
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
        const url = `${CallSteamAPI.#baseURL}/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appid}&key=${CallSteamAPI.#key}&steamid=${steamid}`;
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
        const url = `${CallSteamAPI.#baseURL}/IPlayerService/GetOwnedGames/v0001/?key=${CallSteamAPI.#key}&steamid=${steamid}${includeAppInfoParam}${includePlayedFreeGamesParam}&format=json`;
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
        const url = `${CallSteamAPI.#baseURL}/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${CallSteamAPI.#key}&steamid=${steamid}${countParam}&format=json`;
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