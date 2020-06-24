# /api/userSteamDetails

### `1. /api/userSteamDetails/id/{profile_custom_url}`

We know Steam Community profile link with custom URL looks like `https://steamcommunity.com/id/stonecoldman` and in this end point `profile_custom_url` = `stonecoldman` from our previous mentioned URL example.

### `2. /api/userSteamDetails/profiles/{steam_id_64}`

We know Steam Community profile link without custom URL looks like `https://steamcommunity.com/profiles/76561198893083379` and in this end point `steam_id_64` = `76561198893083379` from our previous mentioned URL example.

### Example Response

```json
{
    "user": {
        "communityi_visibility_state": 3, // 3 = Public, 1 = Private, Friends only(not visible to you) TODO Use this to show `profile private` on client
        "name": "Papa Stalin", // Steam profile name
        "current_status": "Playing Counter-Strike: Global Offensive", // if online, response = "Online", if offline, response = "Last seen 2 days ago", if in-game, response = "Playing CSGO"
        "steam_level": 51, // Steam profile level
        "avatar_image_url": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ba/baf981047b4519cec67ea83ac28889ed7854ee89_medium.jpg" // 64x64px
    }
}
```

### Example use on the client

<img src="./images/sidebar_profile_card.png">
