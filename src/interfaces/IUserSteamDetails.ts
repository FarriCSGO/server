export default interface IUserSteamDetails {
  name: string;
  steam_level: number | string;
  avatar_image_url: string;
  online_status: number | string;
  playing_game: string | undefined;
}
