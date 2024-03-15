# Steam Web API Library

## Version

Steam Web API Library is currently in version 0.1.0 per the [Semantic Versioning standards](https://semver.org).

Enhancements, features, and known issues are available in the [Issues](https://github.com/cambsull/SteamWebAPILibrary/issues) and [Projects](https://github.com/users/cambsull/projects/3) section of this respository.

## Overview

Steam Web API Library is a JavaScript library that makes it easier to query data from the Steam Web API. The library reduces the amount of tedious API endpoint information you need to look up by doing that part for you. All you need to do is import the library, instantiate it via the *new* keyword, and follow the usage guide below! The library returns data as a JSON object.

## 1.0 | Quickstart Guide

Steam Web API Library is easy to install and use:

1. Add SteamWebAPILibrary.js to your project directory.

2. Add these dependencies to your package.json file:

```
 "dependencies": {
    "dotenv": "^16.4.5",
    "process": "^0.11.10"
  }
```

3. Run ```npm install``` in your project root directory.

4. Ensure that you have your Steam Web API key in a .env file in the root directory of your project. Refer to *example.env* for naming requirements:

```STEAM_KEY=XXXXXXXXXXXXXXXXXXXXXXX```

5. Import Steam Web API Library into your project:

```import CallSteamAPI from "./SteamWebAPILibrary.js";```

## 2.0 | Usage


### 2.1 | Option one (recommended) -- passing arguments as a destructured object

Create an async function and call the library method you wish to use, then call the function as needed in your synchronous code.

When using this method, you may place your arguments in any order you wish in your destructured object, and it will be easier to see which arguments are being passed.

```js
const myAppVariable = new CallSteamAPI();

async function myFunc({appid, count, maxlength}) {

    const myAppId = appid;
    const myCount = count;
    const myMaxLength = maxlength;

    const result = await myAppVariable.getNewsForApp(myAppId, myCount, myMaxLength);
    //Do something with the result
}

myFunc({
    count: '5',
    maxlength: '500',
    appid: '440',
});

// Returns up to 5 articles of news, each up to 500 characters, for the selected appid, 440.
```

Parameters that have a default value will maintain their default value whether or not they are included in your destructured object.

```js
const myAppVariable = new CallSteamAPI();

async function myFunc({appid, count, maxlength}) {

    const myAppId = appid;
    const myCount = count;
    const myMaxLength = maxlength;

    const result = await myAppVariable.getNewsForApp(myAppId, myCount, myMaxLength);
    //Do something with the result
}

myFunc({
    appid: '440',
});

// Returns up to the default 3 articles of news, each up to the default 300 characters, for the selected appid, 440.
```

### 2.2 | Option two -- passing arguments directly

Create an async function and call the library method you wish to use, then call the function as needed in your synchronous code.

This has the disadvantage of being less clear which arguments you are passing for which parameters, and you must maintain the same order of arguments as defined by the
methods.

```js

const myAppVariable = new CallSteamAPI();

async function myFunc() {
        const result = await myAppVariable.getNewsForApp('440', '4', '400')
        
        //Do something with the result
}

myFunc()

//Returns up to four articles of news, each up to 400 characters, for the selected appid, 440.

```



## 3.0 | Parameter Definitions

|     **Parameter name**    |   **Valid types**  |                          **Valid arguments**                         |                                    **Notes**                                    |
|:-------------------------:|:------------------:|:--------------------------------------------------------------------:|:-------------------------------------------------------------------------------:|
|           appid           |     String, Int    |                       Must be a multiple of 10                       |                                   Steam App ID                                  |
|       appids_filter       |       Integer      |                           Array of Integers                          |                              Requires a method call                             |
|           count           | String, Int, Float | No upper limit; API returns maximum available for very large numbers |   Number of items to return from query. Float rounded down to nearest integer.  |
|           format          |       String       |                             json, xml, vdf                           |                             Format of returned data                             |
|           gameid          |     String, Int    |                       Must be a multiple of 10                       |                          Essentially identical to appid                         |
|            key            |       String       |                                  N/A                                 |                                  32 characters                                  |
|      include_appinfo      |       Boolean      |                              true, false                             |                                                                                 |
| include_played_free_games |       Boolean      |                              true, false                             |                                                                                 |
|             l             |       String       |                               Language                               |                             This is a lower case “L”                            |
|         maxlength         | String, Int, Float | No upper limit; API returns maximum available for very large numbers | Number of characters to return per item. Float rounded down to nearest integer. |
|        relationship       |       String       |                              all, friend                             |                         Not sure what this actually does                        |
|          steamid          |       String       |                                64-bit                                |                             Steam Player Profile ID                             |

## 4.0 | Expected Return Values, Per Method

Below are the expected server responses for each available argument, per method.

"Code" refers to the HTTPS response from the Steam Web API server(s).

### 4.1 | getNewsForApp

|         **Argument**         |                 **Returns**                 | **Code** |
|:----------------------------:|:-------------------------------------------:|:--------:|
|         appid, legal         |            json, xml, vdf object            |    200   |
|        appid, illegal        |                 Empty object                |    403   |
|   appid, blank/unspecified   |                 Bad request                 |    400   |
|         count, legal         |            json, xml, vdf object            |    200   |
|        count, illegal        |     json, xml, vdf object (no newsitems)    |    200   |
|   count, blank/unspecified   |     json, xml, vdf object (20 newsitems)    |    200   |
|         format, legal        |            json, xml, vdf object            |    200   |
|        format, illegal       |                 json object                 |    200   |
|   format, blank/unspecified  |                 json object                 |    200   |
|       maxlength, legal       |            json, xml, vdf object            |    200   |
|      maxlength, illegal      | json, xml, vdf object (maximum char length) |    200   |
| maxlength, blank/unspecified | json, xml, vdf object (maximum char length) |    200   |


### 4.2 | getGlobalAchievementPercentagesForApp

|        **Argument**       |      **Returns**      | **Code** |
|:-------------------------:|:---------------------:|:--------:|
|       format, legal       | json, xml, vdf object |    200   |
|      format, illegal      |      json object      |    200   |
| format, blank/unspecified |      json object      |    200   |
|       gameid, legal       | json, xml, vdf object |    200   |
|      gameid, illegal      |      Empty object     |    403   |
| gameid, blank/unspecified |      Bad request      |    400   |


### 4.3 | getPlayerSummaries

|         **Argument**        |           **Returns**           | **Code** |
|:---------------------------:|:-------------------------------:|:--------:|
|        format, legal        |      json, xml, vdf object      |    200   |
|       format, illegal       |           json object           |    200   |
|  format, blank/unspecified  |           json object           |    200   |
|          key, legal         |        API access allowed       |    200   |
|         key, illegal        |            Forbidden            |    403   |
|    key, blank/unspecified   |           Bad request           |    400   |
|       steamids, legal       |      json, xml, vdf object      |    200   |
|      steamids, illegal      | Object with empty players array |    200   |
| steamids, blank/unspecified |           Bad request           |    400   |

### 4.4 | getFriendList

|           **Argument**          |      **Returns**      | **Code** |
|:-------------------------------:|:---------------------:|:--------:|
|          format, legal          | json, xml, vdf object |    200   |
|         format, illegal         |      json object      |    200   |
|    format, blank/unspecified    |      json object      |    200   |
|            key, legal           |   API access allowed  |    200   |
|           key, illegal          |       Forbidden       |    403   |
|      key, blank/unspecified     |      Bad request      |    400   |
|       relationship, legal       | json, xml, vdf object |    200   |
|      relationship, illegal      |      Empty object     |    401   |
| relationship, blank/unspecified | json, xml, vdf object |    200   |
|          steamid, legal         | json, xml, vdf object |    200   |
|         steamid, illegal        | Internal Server Error |    500   |
|    steamid, blank/unspecified   |      Bad request      |    400   |

### 4.5 | getPlayerAchievements

|        **Argument**        |            **Returns**           | **Code** |
|:--------------------------:|:--------------------------------:|:--------:|
|        appid, legal        |       json, xml, vdf object      |    200   |
|       appid, illegal       |       Internal Server Error      |    500   |
|  appid, blank/unspecified  |            Bad request           |    400   |
|         key, legal         |        API access allowed        |    200   |
|        key, illegal        |             Forbidden            |    403   |
|   key, blank/unspecified   |            Bad request           |    400   |
|          l, legal          |       json, xml, vdf object      |    200   |
|         l, illegal         | json, xml, vdf object in English |    200   |
|    l, blank/unspecified    |       json, xml, vdf object      |    200   |
|       steamid, legal       |       json, xml, vdf object      |    200   |
|      steamid, illegal      |       Internal Server Error      |    500   |
| steamid, blank/unspecified |            Bad request           |    400   |

### 4.6 | getUserStatsForGames

|        **Argument**        |            **Returns**           | **Code** |
|:--------------------------:|:--------------------------------:|:--------:|
|        appid, legal        |       json, xml, vdf object      |    200   |
|       appid, illegal       |       Internal Server Error      |    500   |
|  appid, blank/unspecified  |            Bad request           |    400   |
|         key, legal         |        API access allowed        |    200   |
|        key, illegal        |             Forbidden            |    403   |
|   key, blank/unspecified   |            Bad request           |    400   |
|          l, legal          |       json, xml, vdf object      |    200   |
|         l, illegal         | json, xml, vdf object in English |    200   |
|    l, blank/unspecified    |       json, xml, vdf object      |    200   |
|       steamid, legal       |       json, xml, vdf object      |    200   |
|      steamid, illegal      |       Internal Server Error      |    500   |
| steamid, blank/unspecified |            Bad request           |    400   |

### 4.7 | getOwnedGames

|                 **Argument**                 |            **Returns**           | **Code** |
|:--------------------------------------------:|:--------------------------------:|:--------:|
|                 appids_filter                | Filtered results per method call |    N/A   |
|                 format, legal                |       json, xml, vdf object      |    200   |
|                format, illegal               |            json object           |    200   |
|           format, blank/unspecified          |            json object           |    200   |
|            include_appinfo, legal            |       json, xml, vdf object      |    200   |
|           include_appinfo, illegal           |       json, xml, vdf object      |    200   |
|      include_appinfo, blank/unspecified      |       json, xml, vdf object      |    200   |
|       include_played_free_games, legal       |       json, xml, vdf object      |    200   |
|      include_played_free_games, illegal      |       json, xml, vdf object      |    200   |
| include_played_free_games, blank/unspecified |       json, xml, vdf object      |    200   |
|                steamid, legal                |       json, xml, vdf object      |    200   |
|               steamid, illegal               |       Internal Server Error      |    500   |
|          steamid, blank/unspecified          |            Bad request           |    400   |

### 4.8 | getRecentlyPlayedGames

|        **Argument**        |       **Returns**      | **Code** |
|:--------------------------:|:----------------------:|:--------:|
|        count, legal        |  json, xml, vdf object |    200   |
|       count, illegal       | json, xml, vdf object  |    200   |
|  count, blank/unspecified  | json, xml, vdf object  |    200   |
|        format, legal       |  json, xml, vdf object |    200   |
|       format, illegal      |       json object      |    200   |
|  format, blank/unspecified |       json object      |    200   |
|         key, legal         |   API access allowed   |    200   |
|        key, illegal        |        Forbidden       |    403   |
|   key, blank/unspecified   |       Bad request      |    400   |
|       steamid, legal       |  json, xml, vdf object |    200   |
|      steamid, illegal      |  Internal Server Error |    500   |
| steamid, blank/unspecified |       Bad request      |    400   |

## 5.0 | Methods

Steam Web API Library has a method for each available Steam Web API Method. The method names are identical to the [official Steam Web API documentation](https://developer.valvesoftware.com/wiki/Steam_Web_API). This section describes how to use each method within the context of the Steam Web API Library. The methods are presented in the same order as the official Steam Web API Library (as of the time of this writing).

### 5.1 | getNewsForApp

**Description**: Returns the latest news for a game, specified by its appID.

**Arguments**:

* appid : The appID of the game for which you want to retrieve news, as a string.

* count (optional) : The number of items to return, as a string or integer.

* maxlength (optional) : The maximum length of each entry in characters, as a string or integer.

**Example**:

```myAppVariable.getNewsForApp('440', 5, 500)```

 ### 5.2 | getGlobalAchievementPercentagesForApp

 **Description**: Returns global achievements for the specific game in percentages.

 **Arguments**:

 * appid : The appID of the game for which you want to retrieve the global achievement stats.

 **Example**:

 ```myAppVariable.getGlobalAchievementPercentagesForApp('440');```

 ### 5.3 | getPlayerSummaries 

 **Description**: Returns profile information for a list of Steam Player IDs. The profiles must have Public visibility to be retrieved successfully.

 **Arguments**:

 * steamids: A string of Steam Player IDs, separated by a comma. The API supports up to 100.

 **Example**:

 ```myAppVariable.getPlayerSummaries('76561197960435530, 76561197960435531, 76561197960435532, 76561197960435533');```
 
 ### 5.4 | getFriendList

 **Description**: Returns the friend list of a specified Steam user. The profile must have Public visibility to be retrieved successfully.

 **Arguments**:

 * steamid: The Steam Player ID of the profile to retrieve, as a string.

 * relationship (optional): The relationship of the information to the specified user, as a string. Accepted arguments are "all" and "friend".

 **Example**:

 ```myAppVariable.getFriendList('76561197960435530');```

 (Note: this particular example uses the profile ID found in the official documentation, which is current set to private.)

### 5.5 | getPlayerAchievements

**Description**: Returns a list of achievements for a particular user, for a specific app ID.

**Arguments**

* steamid: The Steam Player ID of the profile to retrieve, as a string.

* appid : The appID of the game for which you want to retrieve the player achievements.

**Example**:

```myAppVariable.getPlayerAchievements('76561197960435530', '440');```

### 5.6 | getUserStatsForGame

**Description**: Returns a list of information and achievements for a particular user, for a specific app ID.

**Arguments**:

* steamid: The Steam Player ID of the profile to retrieve, as a string.

* appid : The appID of the game for which you want to retrieve user stats, as a string or integer.

**Example**:

```myAppVariable.getUserStatsForGame('76561197960435530', '440')```

### 5.7 | getOwnedGames

**Description**: Returns a list of owned games for a particular user, if the user's profile is set to Public visibility.

**Arguments**:

* steamid: The Steam Player ID of the profile to retrieve, as a string.

* include_appinfo (optional): Whether or not you want additional app info included in the results, as as boolean.

* include_played_free_games (optional): Whether or not you want to include free games that all Steam accounts technically "own", as a boolean.

**Example**:

```myAppVariable.getOwnedGames('76561197960435530', true, true);```

### 5.8 | getRecentlyPlayedGames

**Description**: Returns a list of games played by a specified user within the last two weeks, if the profile is set to Public visibility.

**Arguments**:

* steamid: The Steam Player ID of the profile to retrieve, as a string.

**Example**:

```myAppVariable.getRecentlyPlayedGames('76561197960435530');```