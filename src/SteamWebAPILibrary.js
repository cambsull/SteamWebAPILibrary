import 'dotenv/config';

async function handleEndpointOrFormat(format, url, method, specificData) {
    //DRY template for handling if a specific format or data endpoint is specified

    let dataEndpoint = null;

    switch (method) {
        case 'getNewsForApp':
            if (specificData) {
                dataEndpoint = 'appnews.' + specificData;
            } else {
                dataEndpoint = 'appnews'
            }
            break;
        case 'getGlobalAchievementPercentagesForApp':
            if (specificData) {
                dataEndpoint = 'achievementpercentages.' + specificData;
            } else {
                dataEndpoint = 'achievementpercentages.achievements';
            }
            break;
        default:
            console.error("Invalid method: ", method);
            return null;
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
                throw new Error(`The server returned an error: ${response.status}`);
            }
            const xml = await response.text();
            return xml;
        } catch (error) {
            console.error('Error fetching XML: ', error);
            return null;
        }
    } else if (format === 'vdf') try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const vdf = await response.text();
        return vdf;
    } catch (error) {
        console.error('Error fetching VDF: ', error);
        return null;
    } else {
        console.error(`An unknown format was specified. Format is an optional parameter and is a JSON object by default.`)
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

    async getNewsForApp(appid, count = 3, maxlength = 300, format = 'json', specificData) {
        const endpoint = `/ISteamNews/GetNewsForApp/v0002/`;
        const query = `?appid=${appid}&count=${count}&maxlength=${maxlength}&format=${format}`;
        const url = `${CallSteamAPI.#baseURL}` + endpoint + query;

        if (format != 'json' || specificData) {

            return handleEndpointOrFormat(format, url, 'getNewsForApp', specificData);
        } else {
            try {
                const response = await fetch(url);
                const data = await response.json();
                return data.appnews;
            } catch (error) {
                console.error('The server returned an error: ', error);
                return null;
            }
        }
    }

    async getGlobalAchievementPercentagesForApp(gameid, format, specificData) {
        const endpoint = `/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v002/`;
        const query = `?gameid=${gameid}&format=${format}`;
        const url = `${CallSteamAPI.#baseURL}` + endpoint + query;

        if (format || specificData) {
            return handleEndpointOrFormat(format, url, 'getGlobalAchievementPercentagesForApp', specificData);
        } else {
            try {
                const response = await fetch(url);
                const data = await response.json();
                return data.achievementpercentages.achievements;
            } catch (error) {
                console.error('The server returned an error: ', error);
                return null;
            }
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