# Steam Web API Library

## Overview

Steam Web API Library is a JavaScript library that makes it easier to query data from the Steam Web API. The library reduces the amount of tedious API endpoint information you
need to look up by doing that part for you. All you need to do is import the library, instantiate it via the *new* keyword, and follow the usage guide below! The library returns data as a JSON object.

## Getting Steam Web API Library ready

Steam Web API Library is easy to install and use:

1. Add SteamWebAPILibrary.js to your project directory.

2. Update your package.json file to include the following

```
 "dependencies": {
    "dotenv": "^16.4.5",
    "process": "^0.11.10"
  },
  "type": "module"
```

3. Run ```npm install``` in your project root directory.

4. Ensure that you have your Steam Web API key in a .env file in the root directory of your project. Refer to *example.env* for naming requirements:

```STEAM_KEY=XXXXXXXXXXXXXXXXXXXXXXX```

5. Import Steam Web API Library into your project:

```import CallSteamAPI from "./SteamWebAPILibrary.js";```

## Usage

Create an async function and call the library method you wish to use, then call the function as needed in your synchronous code.

```
const myAppVariable = new CallSteamAPI();

async function myFunction() {
        const result = await myAppVariable.getNewsForApp('440')
        
        //Do something with the result
}

myFunction()

```

## Methods

Steam Web API Library has a method for each available Steam Web API Method. The method names are identical to the [official Steam Web API documentation](https://developer.valvesoftware.com/wiki/Steam_Web_API). This section describes how to use each method within the context of the Steam Web API Library. The methods are presented in the same order as the official Steam Web API Library (as of the time of this writing).

### getNewsForApp

**Description**: Returns the latest news for a game, specified by its appID.

**Arguments**:

* appid : The appID of the game for which you want to retrieve news, as a string.

* count (optional) : The number of items to return, as a string or integer.

* maxlength (optional) : The maximum length of each entry in characters, as a string or integer.

**Example**:

```myAppVariable.getNewsForApp('440', 5, 500)```

 Returns five news data entries for App ID 440 with up to 500 characters each.

 ### getGlobalAchievementPercentagesForApp

 **Description**: Returns global achievements for the specific game in percentages.

 **Arguments**:

 * appid : The appID of the game for which you want to retrieve the global achievement stats.

 **Example**:

 ```myAppVariable.getGlobalAchievementPercentagesForApp('440');```

 ### getPlayerSummaries 

 **Description**: Returns profile information for a list of Steam Player IDs. The profiles must have Public visibility to be retrieved successfully.

 **Arguments**:

 * steamids: A string of Steam Player IDs, separated by a comma. The API supports up to 100.

 **Example**:

 ```myAppVariable.getPlayerSummaries('76561197960435530, 76561197960435531, 76561197960435532, 76561197960435533');```
 
 ### getFriendList

 **Description**: Returns the friend list of a specified Steam user. The profile must have Public visibility to be retrieved successfully.

 **Arguments**:

 * steamid: The Steam Player ID of the profile to retrieve, as a string.

 * relationship (optional): The relationship of the information to the specified user, as a string. Accepted arguments are "all" and "friend".

 **Example**:

 ```myAppVariable.getFriendList('76561197960435530');```

 (Note: this particular example uses the profile ID found in the official documentation, which is current set to private.)

### getPlayerAchievements

**Description**: Returns a list of achievements for a particular user, for a specific app ID.

**Arguments**

* steamid: The Steam Player ID of the profile to retrieve, as a string.

* appid : The appID of the game for which you want to retrieve the player achievements.

**Example**:

```myAppVariable.getPlayerAchievements('76561197960435530', '440');```

### getUserStatsForGame

**Description**: Returns a list of information and achievements for a particular user, for a specific app ID.

**Arguments**:

* steamid: The Steam Player ID of the profile to retrieve, as a string.

* appid : The appID of the game for which you want to retrieve user stats, as a string or integer.

**Example**:

```myAppVariable.getUserStatsForGame('76561197960435530', '440')```

### getOwnedGames

**Description**: Returns a list of owned games for a particular user, if the user's profile is set to Public visibility.

**Arguments**:

* steamid: The Steam Player ID of the profile to retrieve, as a string.

* include_appinfo (optional): Whether or not you want additional app info included in the results, as as boolean.

* include_played_free_games (optional): Whether or not you want to include free games that all Steam accounts technically "own", as a boolean.

**Example**:

```myAppVariable.getOwnedGames('76561197960435530', true, true);```

### getRecentlyPlayedGames

**Description**: Returns a list of games played by a specified user within the last two weeks, if the profile is set to Public visibility.

**Arguments**:

* steamid: The Steam Player ID of the profile to retrieve, as a string.

**Example**:

```myAppVariable.getRecentlyPlayedGames('76561197960435530');```


 