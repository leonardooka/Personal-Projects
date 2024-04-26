import {postDataToDatabase} from "../database";

export function matchScore() {
  const randomNumber = Math.ceil(Math.random() * 200);

  const goals = () => {
    if (randomNumber <= 40) {
      return 0;
    } else if (randomNumber <= 100) {
      return 1;
    } else if (randomNumber <= 155) {
      return 2;
    } else if (randomNumber <= 185) {
      return 3;
    } else if (randomNumber <= 193) {
      return 4;
    } else if (randomNumber <= 197) {
      return 5;
    } else if (randomNumber <= 199) {
      return 6;
    } else if (randomNumber <= 200) {
      return 7;
    } else {
      return 8;
    }
  };
  return goals();
}

export function authors(teamPlayers) {
  const goalAuthorPosition = () => {
    const randomNumber = Math.ceil(Math.random() * 200);
    if (randomNumber <= 1) {
      return "GK";
    } else if (randomNumber <= 12) {
      return "CB";
    } else if (randomNumber <= 22) {
      return "LB";
    } else if (randomNumber <= 32) {
      return "RB";
    } else if (randomNumber <= 60) {
      return "DM";
    } else if (randomNumber <= 110) {
      return "AM";
    } else {
      return "ST";
    }
  };

  const goalAuthorPos = goalAuthorPosition();
  const positionPlayers = teamPlayers.filter(
    (player) => player.position.slice(5, 7) === goalAuthorPos
  );

  let randomIndex = Math.floor(Math.random() * positionPlayers.length)
  const goalAuthor = positionPlayers[randomIndex].name;

  const assistAuthorPosition = () => {
    const randomNumber2 = Math.ceil(Math.random() * 200);
    if (randomNumber2 <= 1) {
      return "GK";
    } else if (randomNumber2 <= 14) {
      return "CB";
    } else if (randomNumber2 <= 38) {
      return "LB";
    } else if (randomNumber2 <= 62) {
      return "RB";
    } else if (randomNumber2 <= 90) {
      return "DM";
    } else if (randomNumber2 <= 160) {
      return "AM";
    } else {
      return "ST";
    }
  };

  let assistAuthorPos = assistAuthorPosition();
  let positionAssistants = teamPlayers.filter(
    (player) => player.position.slice(5, 7) === assistAuthorPos
  );
  let assistAuthor =
    positionAssistants[Math.floor(Math.random() * positionAssistants.length)]
      .name;

  while (assistAuthor === goalAuthor) {
    assistAuthorPos = assistAuthorPosition();
    positionAssistants = teamPlayers.filter(
      (player) => player.position.slice(5, 7) === assistAuthorPos
    );
    assistAuthor =
      positionAssistants[Math.floor(Math.random() * positionAssistants.length)]
        .name;
  }

  return { goal: goalAuthor, assist: assistAuthor };
}

export function allRounds(teams) {
  if (teams[0].name) {
    const onlyNamesFilter = teams.map((team) => team.name);
    teams = onlyNamesFilter;
  }
  const isEvenTeamsNumber = teams.length % 2 === 0;
  if (!isEvenTeamsNumber) {
    teams.unshift("bye");
  }
  const numberOfRounds = teams.length - 1;
  const matchesPerRound = teams.length / 2;
  const allRoundsMatches = [];

  for (let r = 0; r < numberOfRounds; r++) {
    const matches = [];
    let n;
    for (let i = 0; i < matchesPerRound; i++) {
      n = i !== 0 ? n + 2 : 0;
      matches.push({
        teamA: teams[n],
        teamB: teams[n + 1],
        goalsA: null,
        goalsB: null,
        authorsA: null,
        authorsB: null,
      });
    }
    const roundResults = {
      round: r + 1,
      status: "not complete",
      matches: matches,
    };
    allRoundsMatches.push(roundResults);

    const realocatedTeam = teams[1];
    teams.splice(1, 1);
    teams = [...teams, realocatedTeam];
  }

  return allRoundsMatches;
}

export function updateLeagueStandings(matches, league) {
  const currentLeagueClone = league;
  matches.map((match) => {
    if (match.goalsA >= 0) {
      const standingsTeamA = currentLeagueClone.standings.find(
        (standing) => standing.team === match.teamA
      );
      const standingsTeamB = currentLeagueClone.standings.find(
        (standing) => standing.team === match.teamB
      );

      standingsTeamA.games++;
      standingsTeamB.games++;
      standingsTeamA.gf += match.goalsA;
      standingsTeamB.gf += match.goalsB;
      standingsTeamA.ga += match.goalsB;
      standingsTeamB.ga += match.goalsA;
      standingsTeamA.gd = standingsTeamA.gf - standingsTeamA.ga;
      standingsTeamB.gd = standingsTeamB.gf - standingsTeamB.ga;

      if (match.goalsA > match.goalsB) {
        standingsTeamA.pts += 3;
        standingsTeamA.victories++;
        standingsTeamB.losses++;
      }
      if (match.goalsA < match.goalsB) {
        standingsTeamB.pts += 3;
        standingsTeamB.victories++;
        standingsTeamA.losses++;
      }
      if (match.goalsA === match.goalsB) {
        standingsTeamA.pts++;
        standingsTeamB.pts++;
        standingsTeamA.draws++;
        standingsTeamB.draws++;
      }
    }
  });
  return currentLeagueClone;
}

export function sortStandings(standingsList) {
  if (!standingsList) {
    console.log('no standingsList')
    return standingsList;
  }

  for (let n = 0; n < standingsList.length - 1; n++) {
    let correctSpots = 0;
    for (let i = 0; i < standingsList.length - 1; i++) {
      const teamA = standingsList[i];
      const teamB = standingsList[i + 1];
      if (teamA.pts < teamB.pts) {
        standingsList[i] = teamB;
        standingsList[i + 1] = teamA;
      } else if (teamA.pts == teamB.pts) {
        if (teamA.victories < teamB.victories) {
          standingsList[i] = teamB;
          standingsList[i + 1] = teamA;
        } else if (teamA.victories == teamB.victories) {
          if (teamA.gf < teamB.gf) {
            standingsList[i] = teamB;
            standingsList[i + 1] = teamA;
          } else if (teamA.gf == teamB.gf) {
            if (teamA.team > teamB.team) {
              standingsList[i] = teamB;
              standingsList[i + 1] = teamA;
            } else {
              correctSpots++;
            }
          }
        } else {
          correctSpots++;
        }
      } else {
        correctSpots++;
      }
    }

    if (correctSpots === standingsList.length - 1) {
      return standingsList;
    }
  }

  return standingsList;
}

export function updatePlayerRanks(authors, teamA, teamB, players, leagueId, currentRound) {
  let playersClone = players;
  const authorsA = authors.authorsA;
  const authorsB = authors.authorsB;

  if (authorsA.length) {
    authorsA.map((authors) => {
      const scorerA = playersClone.find(
        (player) => player.name === authors.goal && player.team === teamA
      );
      const assistantA = playersClone.find(
        (player) => player.name === authors.assist && player.team === teamA
      );

      if (scorerA.goals) {
        let matchedLeagueGoalsA = scorerA.goals.find(
          (goal) => goal.league == leagueId
        );
        if (matchedLeagueGoalsA != null) {
          if (matchedLeagueGoalsA.rounds < currentRound){
            matchedLeagueGoalsA.rounds = currentRound
          }
          matchedLeagueGoalsA.goals++;
        } else {
          scorerA.goals.push({ league: Number(leagueId), goals: 1 , rounds: currentRound});
        }
      } else {
        scorerA.goals = [{ league: Number(leagueId), goals: 1, rounds: currentRound}];
      }

      const stringScorerAGoals = JSON.stringify(scorerA.goals)
      const stringScorerAAssists = JSON.stringify(scorerA.assists)
      const scorerAData = {goals: stringScorerAGoals, assists: stringScorerAAssists}

      postDataToDatabase(
        scorerAData,
        `edit-player/${scorerA.player_id}`,
        "PATCH"
      );

      if (assistantA.assists) {
        let matchedLeagueAssistantsA = assistantA.assists.find(
          (assist) => assist.league == leagueId
        );
        if (matchedLeagueAssistantsA != null) {
          if (matchedLeagueAssistantsA.rounds < currentRound){
            matchedLeagueAssistantsA.rounds = currentRound
          }
          matchedLeagueAssistantsA.assists++;
        } else {
          assistantA.assists.push({ league: Number(leagueId), assists: 1, rounds: currentRound });
        }
      } else {
        assistantA.assists = [{ league: Number(leagueId), assists: 1, rounds: currentRound }];
      }

      const stringAssistantAGoals = JSON.stringify(scorerA.goals)
      const stringAssistantAAssists = JSON.stringify(scorerA.assists)
      const assistantAData = {goals: stringAssistantAGoals, assists: stringAssistantAAssists}

      postDataToDatabase(
        assistantAData,
        `edit-player/${assistantA.player_id}`,
        "PATCH"
      );
    });
  }
  if (authorsB.length) {
    authorsB.map((authors) => {
      const scorerB = playersClone.find(
        (player) => player.name === authors.goal && player.team === teamB
      );
      const assistantB = playersClone.find(
        (player) => player.name === authors.assist && player.team === teamB
      );

      if (scorerB.goals) {
        let matchedLeagueGoalsB = scorerB.goals.find(
          (goal) =>
            goal.league == leagueId
        );
        if (matchedLeagueGoalsB != null) {
          if (matchedLeagueGoalsB.rounds < currentRound){
            matchedLeagueGoalsB.rounds = currentRound
          }
          matchedLeagueGoalsB.goals++;
        } else {
          scorerB.goals.push({ league: Number(leagueId), goals: 1, rounds: currentRound });
        }
      } else {
        scorerB.goals = [{ league: Number(leagueId), goals: 1, rounds: currentRound }];
      }

      const stringScorerBGoals = JSON.stringify(scorerB.goals)
      const stringScorerBAssists = JSON.stringify(scorerB.assists)
      const scorerBData = {goals: stringScorerBGoals, assists: stringScorerBAssists}

      postDataToDatabase(
        scorerBData,
        `edit-player/${scorerB.player_id}`,
        "PATCH"
      );

      if (assistantB.assists) {
        let matchedLeagueAssistantsB = assistantB.assists.find(
          (assist) =>
            assist.league == leagueId
        );
        if (matchedLeagueAssistantsB != null) {
          if (matchedLeagueAssistantsB.rounds < currentRound){
            matchedLeagueAssistantsB.rounds = currentRound
          }
          matchedLeagueAssistantsB.assists++;
        } else {
          assistantB.assists.push({ league: Number(leagueId), assists: 1, rounds: currentRound });
        }
      } else {
        assistantB.assists = [{ league: Number(leagueId), assists: 1, rounds: currentRound }];
      }

      const stringAssistantBGoals = JSON.stringify(scorerB.goals)
      const stringAssistantBAssists = JSON.stringify(scorerB.assists)
      const assistantBData = {goals: stringAssistantBGoals, assists: stringAssistantBAssists}

      postDataToDatabase(
        assistantBData,
        `edit-player/${assistantB.player_id}`,
        "PATCH"
      );
    });
  }

  return playersClone;
}

export function sortPlayerRank(players, leagueId, section) {
  for (let i = 0; i < players.length - 1; i++) {
    let correctPlayerSpots = 0;

    for (let p = 0; p < players.length - 1; p++) {
      let playerA;
      let playerB;
      let scoreA;
      let scoreB;
      if (section === "goals") {
        playerA = players[p];
        playerB = players[p + 1];
        if (playerA.goals.length === 1) {
          scoreA = playerA.goals[0].goals;
        } else {
          let filteredGoalsA = playerA.goals.find(
            (obj) => obj.league == leagueId
          );
          scoreA = filteredGoalsA.goals;
        }
        if (playerB.goals.length === 1) {
          scoreB = playerB.goals[0].goals;
        } else {
          let filteredGoalsB = playerB.goals.find(
            (obj) => obj.league == leagueId
          );
          scoreB = filteredGoalsB.goals;
        }
      }
      if (section === "assists") {
        playerA = players[p];
        playerB = players[p + 1];     

        if (playerA.assists.length === 1) {
          scoreA = playerA.assists[0].assists;
        } else {
          let filteredAssistA = playerA.assists.find(
            (obj) => obj.league == leagueId
          );
          scoreA = filteredAssistA.assists;
        }
        if (playerB.assists.length === 1) {
          scoreB = playerB.assists[0].assists;
        } else {
          let filteredAssistB = playerB.assists.find(
            (obj) => obj.league == leagueId
          );
          scoreB = filteredAssistB.assists;
        }
      }

      if (scoreA < scoreB) {
        players[p] = playerB;
        players[p + 1] = playerA;
      } else {
        correctPlayerSpots++;
      }
    }
    if (correctPlayerSpots === players.length - 1) {
      return players;
    }
  }
  return players;
}
