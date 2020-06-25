# /api/userSteamDetails

### `1. /api/userSteamDetails/id/{profile_custom_url}`

We know Steam Community profile link with custom URL looks like `https://steamcommunity.com/id/stonecoldman` and in this end point `profile_custom_url` = `stonecoldman` from our previous mentioned URL example.

### `2. /api/userSteamDetails/profiles/{steam_id_64}`

We know Steam Community profile link without custom URL looks like `https://steamcommunity.com/profiles/76561198893083379` and in this end point `steam_id_64` = `76561198893083379` from our previous mentioned URL example.

### Example Response

```json
{
    "user": {
        "communityi_visibility_state": 3,
        "name": "Papa Stalin",
        "steam_level": 51,
        "avatar_image_url": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ba/baf981047b4519cec67ea83ac28889ed7854ee89_medium.jpg",
        "last_log_off": 1593015260,
        "online_status": 1,
        "playing_game": "Playing Counter-Strike: Global Offensive"
    }
}
```

### Response explaination

**communityi_visibility_state**

-   **3** = Public, **1** = Private, Friends only(not visible to you)

**name**

-   Steam profile name

**steam_level**

-   Steam profile level

**avatar_image_url**

-   User's steam profile avatar image at 184x184px resolution

**last_log_off**

-   The last time the user was online, in unix time. Only available when you are friends with the requested user (since Feb, 4). Could use this to show user current status as `Last seen 2 days ago`

**online_status**

-   The user's current status. 0 - Offline, 1 - Online, 2 - Busy, 3 - Away, 4 - Snooze, 5 - looking to trade, 6 - looking to play. If the player's profile is private, this will always be "0", except if the user has set their status to looking to trade or looking to play, because a bug makes those status appear even if the profile is private [STEAM_WEB_API].

**playing_game**

-   If the user is in-game, the name of the game user is playing is this.

### Example use on the client

<img src="./images/sidebar_profile_card.png">
