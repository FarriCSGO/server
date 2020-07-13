export default interface IUserSteamDetails {
  name: string;
  steamID64: string;
  steamLevel: number | string;
  avatarImageURL: string;
  onlineStatus: number | string;
  playingGame: string | undefined;
}
