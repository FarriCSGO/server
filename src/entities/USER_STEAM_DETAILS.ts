export default interface USER_STEAM_DETAILS {
    steam_id_64: string;
    community_visibility_state: number | string;
    name: string;
    steam_level: number | string;
    avatar_image_url: string;
    last_log_off: number | string;
    online_status: number | string;
    playing_game?: string;
}
