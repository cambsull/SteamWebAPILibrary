import 'dotenv/config';
import process from 'process';

class CallSteamAPI {
    constructor() {
        this.baseURL = `http://api.steampowered.com`;
        this.key = process.env.STEAM_KEY;
    }
    async getNewsForApp(appid, count = 3, maxlength = 300) {
        const url = `${this.baseURL}/ISteamNews/GetNewsForApp/v0002/?appid=${appid}&count=${count}&maxlength=${maxlength}&format=json`;
        await fetch(url)
            .then(response => response.json())
            .then(data => console.log(data.appnews.newsitems))
            .catch(error => console.error('The server returned an error. Did you specify a valid app id? ', error))
    }
    async getGlobalAchievementPercentagesForApp(gameid) {
        const url = `${this.baseURL}/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v002/?gameid=${gameid}&format=json`;
        await fetch(url)
            .then(response => response.json())
            .then(data => console.log(data.achievementpercentages.achievements))
            .catch(error => console.error('The server returned an error. Did you specify a valid game id? ', error))
    }
    async getPlayerSummaries(steamids) {
        const url = `${this.baseURL}/ISteamUser/GetPlayerSummaries/v0002/?key=${this.key}&steamids=${steamids}`;
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                data.response.players.forEach(player => {
                    console.log(player);
                });
            })
            .catch(error => console.error('The server returned an error. Did you specify a valid list of Steam IDs in ONE string, separated by commas? ', error))
    }
    async getFriendList(steamid, relationship=`friend`){
        const url = `${this.baseURL}/ISteamUser/GetFriendList/v0001/?key=${this.key}&steamid=${steamid}&relationship=${relationship}`;
        await fetch(url)
            .then(response => response.json())
            .then(data => console.log(data.friendslist.friends))
            .catch(error => console.error('The server returned an error. Did you specify a valid steam id? ', error))
    }
    async getPlayerAchievements(steamid, appid) {
        const url = `${this.baseURL}/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appid}&key=${this.key}&steamid=${steamid}`;
        await fetch(url)
            .then(response => response.json())
            .then(data => console.log(data.playerstats))
            .catch(error => console.error('The server returned an error. Did you specify a valid Steam ID and app ID? ', error))
    }
    async getUserStatsForGame(steamid, appid) {
        const url = `${this.baseURL}/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appid}&key=${this.key}&steamid=${steamid}`;
        await fetch(url)
            .then(response => response.json())
            .then(data => console.log(data.playerstats))
            .catch(error => console.error('The server returned an error. Did you specify a valid Steam ID and app ID? ', error))
    }
    async getOwnedGames(steamid, includeAppinfo=false, includePlayedFreeGames=false) {
        const includeAppInfoParam = includeAppinfo ? `&include_appinfo=true&` : '';
        const includePlayedFreeGamesParam = includePlayedFreeGames ? `&include_played_free_games=true&` : '';

        const url = `${this.baseURL}/IPlayerService/GetOwnedGames/v0001/?key=${this.key}&steamid=${steamid}${includeAppInfoParam}${includePlayedFreeGamesParam}&format=json`;
        await fetch(url)
            .then(response => response.json())
            .then(data => data.response.games.forEach(game => {console.log(game)}))
            .catch(error => console.error('The server returned an error. Did you specify a valid Steam ID? ', error))
    }
    async getRecentlyPlayedGames(steamid, count=null) {
        const countParam = count ? `&count=${count}` : '';

        const url = `${this.baseURL}/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${this.key}&steamid=${steamid}${countParam}&format=json`;
        await fetch(url)
            .then(response => response.json())
            .then(data => console.log(data.response))
            .catch(error => console.error('The server returned an error. Did you specify a valid Steam ID? ', error))
    }
}

export default CallSteamAPI;