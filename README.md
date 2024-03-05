# Steam Web API Library

## Overview

Steam Web API Library is a JavaScript library that makes it easier to query data from the Steam Web API. The library reduces the amount of tedious API endpoint information you
need to look up by doing that part for you. All you need to do is import the library, instantiate it via the *new* keyword, and follow the usage guide below! The library returns data as a JSON object.

## Getting Steam Web API Library ready

Steam Web API Library is easy to install and use:

1. Install *dotenv* and *process* with your package manager.

```npm install process && npm install dotenv```

2. Ensure that you have your Steam Web API key in a .env file in the root directory of your project. You must name your environment variable 'STEAM_KEY':

```STEAM_KEY=XXXXXXXXXXXXXXXXXXXXXXX```

Don't forget to include your .env file in your .gitignore file!

3. Import Steam Web API Library into your project. The default export for the libary is "CallSteamAPI":

```import CallSteamAPI from "./SteamWebAPILibrary.js";```

## Instantiation

Instantiate the library with the *new* keyword:

```import CallSteamAPI from "./SteamWebAPILibrary.js";```

```const myAppVariable = new CallSteamAPI();```

## Usage

Call the libary object with your desired method and provide the required arguments:

```myAppVariable.getPlayerSummaries('76561197960435530');```

By default, the returned data is logged to the console.

## Methods

Steam Web API Library has a method for each available Steam Web API Method. The method names are identical to the [official Steam Web API documentation](https://developer.valvesoftware.com/wiki/Steam_Web_API). This section describes how to use each method within the context of the Steam Web API Library. The methods are presented in the same order as the official Steam Web API Library (as of the time of this writing).

### getNewsForApp

Description: The getNewsForApp method returns the latest news for a game, specified by its appID.

Arguments:

* appid : The appID of the game for which you want to retrieve news, as a string.

* count (optional) : The number of items to return, as a string or integer.

* maxlength (optional) : The maximum length of each entry in characters, as a string or integer.

Example:

```myAppVariable.getNewsForApp('440', 5, 500) // Returns five news data entries for App ID 440 with up to 500 characters each.```
