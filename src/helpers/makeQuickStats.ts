import IQuickStats from "../interfaces/IQuickStats";

const makeQuickStats = (data): IQuickStats => {
  const quickStats: IQuickStats = {
    winrate: null,
    kdRatio: null,
    adr: null,
    hsRate: null
  };

  const matchesWon = getMatchesWon(data);
  const matchesPlayed = getMatchesPlayed(data);
  const kills = getKills(data);
  const deaths = getDeaths(data);
  const damage = getTotalDamage(data);
  const rounds = getTotalRounds(data);
  const headshots = getHeadshots(data);

  quickStats.winrate = calcWinrate(matchesWon, matchesPlayed);
  quickStats.kdRatio = calcKD(kills, deaths);
  quickStats.adr = calcADR(damage, rounds);
  quickStats.hsRate = calcHS(kills, headshots);

  return quickStats;
};

function getMatchesWon(data) {
  for (let i = 0; i <= data.length; i++) {
    if (data[i].name === "total_matches_won") {
      const testValue = data[i].value;
      return testValue;
    }
  }
}

function getMatchesPlayed(data) {
  for (let i = 0; i <= data.length; i++) {
    if (data[i].name === "total_matches_played") {
      const testValue = data[i].value;
      return testValue;
    }
  }
}

function getKills(data) {
  for (let i = 0; i <= data.length; i++) {
    if (data[i].name === "total_kills") {
      const value = data[i].value;
      return value;
    }
  }
}

function getDeaths(data) {
  for (let i = 0; i <= data.length; i++) {
    if (data[i].name === "total_deaths") {
      const value = data[i].value;
      return value;
    }
  }
}

function getTotalDamage(data) {
  for (let i = 0; i <= data.length; i++) {
    if (data[i].name === "total_damage_done") {
      const value = data[i].value;
      return value;
    }
  }
}

function getTotalRounds(data) {
  for (let i = 0; i <= data.length; i++) {
    if (data[i].name === "total_rounds_played") {
      const value = data[i].value;
      return value;
    }
  }
}

function getHeadshots(data) {
  for (let i = 0; i <= data.length; i++) {
    if (data[i].name === "total_kills_headshot") {
      const value = data[i].value;
      return value;
    }
  }
}

const calcWinrate = (matchesWon, matchesPlayed): number => {
  const winrate = matchesWon / matchesPlayed;
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
  const hs = headshot / kills;
  return hs;
};

export default makeQuickStats;
