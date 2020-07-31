import IQuickStats, { IValues } from "../interfaces/IQuickStats";

type dataFromSteam = {
  name: string;
  value: number;
};

const getValues = (data: Array<dataFromSteam>, values: IValues): IValues => {
  data.map((key) => {
    if (key.name === "total_matches_won") values.matchesWon = key.value;
    if (key.name === "total_matches_played") values.matchesPlayed = key.value;
    if (key.name === "total_kills") values.kills = key.value;
    if (key.name === "total_deaths") values.deaths = key.value;
    if (key.name === "total_damage_done") values.damage = key.value;
    if (key.name === "total_rounds_played") values.rounds = key.value;
    if (key.name === "total_kills_headshot") values.headshots = key.value;
  });

  return values;
};

const calcWinrate = (matchesWon, matchesPlayed): number => {
  const winrate = (matchesWon / matchesPlayed) * 100;
  return winrate;
};

const calcKD = (kills: number, deaths: number): number => {
  const kd = kills / deaths;
  return kd;
};

const calcADR = (damage: number, rounds: number): number => {
  const adr = damage / rounds;
  return adr;
};

const calcHS = (kills: number, headshot: number): number => {
  const hs = (headshot / kills) * 100;
  return hs;
};

const makeQuickStats = (data: Array<dataFromSteam>): IQuickStats => {
  const quickStats: IQuickStats = {
    winrate: null,
    kdRatio: null,
    adr: null,
    hsRate: null
  };

  let values: IValues = {
    matchesWon: 0,
    matchesPlayed: 0,
    kills: 0,
    deaths: 0,
    damage: 0,
    rounds: 0,
    headshots: 0
  };

  values = getValues(data, values);

  quickStats.winrate = calcWinrate(values.matchesWon, values.matchesPlayed);
  quickStats.kdRatio = calcKD(values.kills, values.deaths);
  quickStats.adr = calcADR(values.damage, values.rounds);
  quickStats.hsRate = calcHS(values.kills, values.headshots);

  return quickStats;
};

export default makeQuickStats;
