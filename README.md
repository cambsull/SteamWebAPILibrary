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

```const mySpecialVariable = new CallSteamAPI();```

## Usage

Call the libary object with your desired method and provide the required arguments:

```mySpecialVariable.getPlayerSummaries('76561197960435530');```

By default, the returned data is logged to the console.

## Methods

Steam Web API Library has a method for each available Steam Web API Method.

