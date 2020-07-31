export default interface QuickStats {
  winrate: number | null;
  kdRatio: number | null;
  adr: number | null;
  hsRate: number | null;
}

export interface IValues {
  matchesWon: number;
  matchesPlayed: number;
  kills: number;
  deaths: number;
  damage: number;
  rounds: number;
  headshots: number;
}
