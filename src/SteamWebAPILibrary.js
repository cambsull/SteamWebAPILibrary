import 'dotenv/config';

async function handleEndpointOrFormat(format, url, method, specificData) {
    //DRY template for handling if a specific format or data endpoint is specified

    const endpointMapping = {
        'getNewsForApp': 'appnews',
        'getGlobalAchievementPercentagesForApp': 'achievementpercentages',
        'getPlayerSummaries': 'response',
        'getFriendList': 'friendslist',
        'getPlayerAchievements': 'playerstats',
        'getUserStatsForGame': 'playerstats',
        'getOwnedGames': 'response',
        'getRecentlyPlayedGames': 'response'
    };

    let dataEndpoint = endpointMapping[method];

    if (!dataEndpoint) {
        console.error("Invalid method: ", method);
        return null;
    }

    if (specificData) {
        dataEndpoint += `.${specificData}`;
    }

    if (format === 'json' || format === '') {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const keys = dataEndpoint.split('.');
            const result = keys.reduce((acc, key) => acc[key], data);

            return result;

        } catch (error) {
            console.error('The server returned an error: ', error);
            return null;
        }
    } else if (format === 'xml') {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error fetching XML-- response code: ${response.status}`)
            }
            const xml = await response.text();
            return xml;
        } catch (error) {
            console.error(`\n An error occurred, exiting. \n\n`, error);
            return null;
        }
    } else if (format === 'vdf') {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error fetching VDF-- response code:  ${response.status}`);
            }
            const vdf = await response.text();
            return vdf;
        } catch (error) {
            console.error(`\n An error occurred, exiting. \n\n`, error);
            return null;
        }
    } else {
        console.error(`An unknown or invalid format was specified\n`)
        return null;
    }
}

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

    //Format should be truthy in each method by default, but if for some reason handleEndpointOrFormat doesn't execute, methods will at least return a default JSON object

    async getNewsForApp({ appid, count = 3, maxlength = 300, format = 'json', specificData }) {
        const endpoint = `/ISteamNews/GetNewsForApp/v0002/`;
        const query = `?appid=${appid}&count=${count}&maxlength=${maxlength}&format=${format}`;
        const url = `${CallSteamAPI.#baseURL}` + endpoint + query;

        try {
            return handleEndpointOrFormat(format, url, 'getNewsForApp', specificData);
        } catch (error) {
            console.error(`There was a problem instantiating the Steam Web API Library object: \n\n${error}\n`);
            return null;
        }
    }
    async getGlobalAchievementPercentagesForApp({ gameid, format = 'json', specificData }) {
        const endpoint = `/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v002/`;
        const query = `?gameid=${gameid}&format=${format}`;
        const url = `${CallSteamAPI.#baseURL}` + endpoint + query;

        try {
            return handleEndpointOrFormat(format, url, 'getGlobalAchievementPercentagesForApp', specificData);
        } catch (error) {
            console.error(`There was a problem instantiating the Steam Web API Library object: \n\n${error}\n`);
            return null;
        }
    }
    async getPlayerSummaries({ steamids, format = 'json', specificData }) {
        const endpoint = `/ISteamUser/GetPlayerSummaries/v0002/`;
        const query = `?key=${this.key}&steamids=${steamids}&format=${format}`
        const url = `${CallSteamAPI.#baseURL}` + endpoint + query;

        try {
            return handleEndpointOrFormat(format, url, 'getPlayerSummaries', specificData);
        } catch (error) {
            console.error(`There was a problem instantiating the Steam Web API Library object: \n\n${error}\n`);
            return null;
        }
    }
    async getFriendList({ steamid, relationship = `friend`, format = 'json', specificData }) {
        const endpoint = `/ISteamUser/GetFriendList/v0001/`;
        const query = `?key=${this.key}&steamid=${steamid}&relationship=${relationship}&format=${format}`
        const url = `${CallSteamAPI.#baseURL}` + endpoint + query;

        try {
            return handleEndpointOrFormat(format, url, 'getFriendList', specificData);
        } catch (error) {
            console.error(`There was a problem instantiating the Steam Web API Library object: \n\n${error}\n`);
            return null;
        }
    }
    async getPlayerAchievements({ steamid, appid, format = 'json', specificData }) {
        const endpoint = `/ISteamUserStats/GetPlayerAchievements/v0001/`;
        const query = `?appid=${appid}&key=${this.key}&steamid=${steamid}&format=${format}`;
        const url = `${CallSteamAPI.#baseURL}` + endpoint + query;

        try {
            return handleEndpointOrFormat(format, url, 'getPlayerAchievements', specificData);
        } catch (error) {
            console.error(`There was a problem instantiating the Steam Web API Library object: \n\n${error}\n`);
            return null;
        }

    }
    async getUserStatsForGame({ steamid, appid, format = 'json', specificData }) {
        const endpoint = `/ISteamUserStats/GetUserStatsForGame/v0002/`;
        const query = `?appid=${appid}&key=${this.key}&steamid=${steamid}&format=${format}`;
        const url = `${CallSteamAPI.#baseURL}` + endpoint + query;

        try {
            return handleEndpointOrFormat(format, url, 'getUserStatsForGame', specificData);
        } catch (error) {
            console.error(`There was a problem instantiating the Steam Web API Library object: \n\n${error}\n`);
            return null;
        }
    }
    async getOwnedGames({ steamid, format = 'json', specificData, includeAppInfo = true, includePlayedFreeGames = true }) {
        const includeAppInfoParam = includeAppInfo ? `&include_appinfo=true` : '';
        const includePlayedFreeGamesParam = includePlayedFreeGames ? `&include_played_free_games=true` : '';

        const endpoint = `/IPlayerService/GetOwnedGames/v0001/`;
        const query = `?key=${this.key}&steamid=${steamid}${includeAppInfoParam}${includePlayedFreeGamesParam}&format=${format}`;
        const url = `${CallSteamAPI.#baseURL}` + endpoint + query;

        try {
            return handleEndpointOrFormat(format, url, 'getOwnedGames', specificData);
        } catch (error) {
            console.error(`There was a problem instantiating the Steam Web API Library object: \n\n${error}\n`);
            return null;
        }
    }
    async getRecentlyPlayedGames({ steamid, format, count = null, specificData }) {
        const countParam = count ? `&count=${count}` : '';

        const endpoint = `/IPlayerService/GetRecentlyPlayedGames/v0001/`;
        const query = `?key=${this.key}&steamid=${steamid}${countParam}&format=${format}`;
        const url = `${CallSteamAPI.#baseURL}` + endpoint + query;

        try {
            return handleEndpointOrFormat(format, url, 'getRecentlyPlayedGames', specificData)
        } catch (error) {
            console.error(`There was a problem instantiating the Steam Web API Library object: \n\n${error}\n`);
            return null;
        }
    }
}

export default CallSteamAPI;