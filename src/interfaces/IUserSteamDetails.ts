export default interface IUserSteamDetails {
  name: string | null;
  steamID64: string | null;
  steamLevel: number | null;
  avatarImageURL: string | null;
  onlineStatus: number | null;
  playingGame: string | null;
}
