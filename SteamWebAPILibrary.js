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
        const url = `${this.baseURL}/ISteamUser/GetPlayerSummaries/v002/?key=${this.key}&steamids=${steamids}`;

        await fetch(url)
            .then(response => response.json())
            .then(data => {
                data.response.players.forEach(player => {
                    console.log(player);
                });
            })
            .catch(error => console.error('The server returned an error. Did you specify a valid list of Steam IDs in ONE string, separated by commas? ', error))
    }
}


export default CallSteamAPI;