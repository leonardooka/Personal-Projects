import React, { createRef, useEffect, useState } from "react";
import {
  authors,
  matchScore,
  updateLeagueStandings,
  updatePlayerRanks,
} from "../../matchmaking/matchmaking";
import { postDataToDatabase } from "../../database";
import Button from "../button/button";

export default function Matches({ league, allPlayers, leagueId }) {
  const doneRounds = league.matches.filter(
    (round) => round.status === "complete"
  );

  const [roundMatches, setRoundMatches] = useState([]);
  const [selectedRound, setSelectedRound] = useState(
    doneRounds.length > 0 ? doneRounds.length : 1
  );
  const [currentRound, setCurrentRound] = useState(
    doneRounds.length > 0 ? doneRounds.length : 1
  );
  const [completedRounds, setCompletedRounds] = useState(doneRounds);
  const [currentLeague, setCurrentLeague] = useState(league);
  const [players, setPlayers] = useState(allPlayers);
  const [savedLeagueRound, setsavedLeagueRound] = useState(doneRounds.length);
  const [triggerEffect, setTriggerEffect] = useState(true);

  const refRound = createRef();

  function updateRoundData() {
    if (currentLeague) {
      const filteredRound = currentLeague.matches.filter(
        (round) => round.round === currentRound
      )[0];

      if (filteredRound.status === "complete") {
        setRoundMatches(filteredRound.matches);
      }

      if (
        doneRounds &&
        doneRounds.length !== completedRounds.length &&
        completedRounds.length
      ) {
        setCompletedRounds(doneRounds);
      }
    }
  }

  useEffect(() => {
    if (triggerEffect) updateRoundData();
  }, [currentRound, triggerEffect]);

  function createResults(roundData) {
    const allMatches = roundData.matches;

    console.log(roundData);

    if (allMatches && players) {
      let updatedPlayers = [...players];
      allMatches.map((match) => {
        match.goalsA = matchScore();
        match.goalsB = matchScore();
        const matchAuthors = getMatchAuthors(match);
        match.authorsA = matchAuthors.authorsA;
        match.authorsB = matchAuthors.authorsB;
        updatedPlayers = updatePlayerRanks(
          matchAuthors,
          match.teamA,
          match.teamB,
          updatedPlayers,
          leagueId,
          currentRound
        );
      });
      setPlayers(updatedPlayers);

      setRoundMatches(allMatches);

      const currentLeagueClone = updateLeagueStandings(
        allMatches,
        currentLeague
      );
      currentLeagueClone.matches[roundData.round - 1].status = "complete";
      setCurrentLeague(currentLeagueClone);
      const rounds = [...completedRounds, roundData];
      setCompletedRounds(rounds);
      if ((currentLeague.matches[roundData.round - 1].status = "complete")) {
        console.log("saving league data", roundData.round);
        saveLeagueData(roundData.round);
      }
    }
  }

  function getMatchAuthors(match) {
    const teamPlayersA = players.filter(
      (player) => player.team === match.teamA
    );
    const teamPlayersB = players.filter(
      (player) => player.team === match.teamB
    );

    const results = {
      authorsA: [],
      authorsB: [],
    };

    for (let i = 0; i < match.goalsA; i++) {
      results.authorsA = [...results.authorsA, authors(teamPlayersA)];
    }
    for (let i = 0; i < match.goalsB; i++) {
      results.authorsB = [...results.authorsB, authors(teamPlayersB)];
    }

    return results;
  }

  function saveLeagueData(round) {
    const stringStandings = JSON.stringify(currentLeague.standings);
    const stringMaches = JSON.stringify(currentLeague.matches);
    const sendingData = { standings: stringStandings, matches: stringMaches };
    postDataToDatabase(
      sendingData,
      `edit-league/${leagueId}`,
      "PATCH",
      (result) => {
        if (result) {
          console.log("league fetch response result is ok!");
          setsavedLeagueRound(round);
        } else {
          console.error("data league sending error");
        }
      }
    );
  }

  function handleClickNextRound() {
    if (completedRounds.length < league.matches.length) {
      const newRound =
        completedRounds.length > 0 ? completedRounds.length + 1 : 1;
      const newRoundData = currentLeague.matches.filter(
        (round) => round.round === newRound
      )[0];

      if (newRoundData.status === "not complete") {
        if (completedRounds.length == 0) {
          createResults(newRoundData);
        }
        if (
          completedRounds.length > 0 &&
          savedLeagueRound == completedRounds.length
        ) {
          setCurrentRound(newRound);
          createResults(newRoundData);
          setTriggerEffect(false);
          setSelectedRound(newRound);
        }
      }
    }
  }

  function handleChange(e) {
    const choice = Number(e.target.value);
    setCurrentRound(choice);
    setSelectedRound(choice);
  }

  return (
    <>
      <div className="text-center mb-3 text-2xl font-semibold text-gray-800">
        Matches
      </div>
      {savedLeagueRound < completedRounds.length && savedLeagueRound > 0 ? (
        <div>League not processed to database yet...</div>
      ) : null}
      <div className="flex flex-row justify-between">
        {completedRounds.length ? (
          <select
            className="w-1/5 rounded"
            value={selectedRound}
            onChange={handleChange}
            ref={refRound}
          >
            {completedRounds.map((round) => (
              <option key={round.round} value={round.round}>
                Round {round.round}
              </option>
            ))}
          </select>
        ) : null}
        <div className="text-left text-2xl font-semibold">
          Round {currentRound}
        </div>
        {completedRounds.length < currentLeague.matches.length ? (
          <Button
            children={
              completedRounds.length == 0 ? "Start" : "Create Next Round"
            }
            onClick={handleClickNextRound}
          />
        ) : (
          <Button children={"Completed"} isDisabled={true} />
        )}
      </div>
      <div className="flex flex-col border-2 h-5/6 mt-5 p-2 gap-5 overflow-auto max-h-[595px] scroll-smooth">
        {roundMatches?.map((match, index) => (
          <div
            key={index}
            className="flex flex-row justify-center bg-white rounded p-5 gap-3 w-full"
          >
            <div className="flex flex-col w-full">
              <div className="text-right font-semibold mb-3">
                {match.teamA}{" "}
              </div>
              <div>
                {match.authorsA?.map((author, index) => (
                  <div
                    key={index}
                    className="flex flex-row gap-3 text-sm justify-end"
                  >
                    <div className="">
                      {author.goal} <i className="fa-solid fa-futbol"></i>
                    </div>
                    <div className="text-violet-900">
                      {author.assist}{" "}
                      <i className="fa-solid fa-handshake-simple"></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                <strong className="ml-2">{match.goalsA}</strong>
                <span className="mx-2">x</span>
                <strong className="mr-2">{match.goalsB}</strong>
              </div>
              <div></div>
            </div>
            <div className="flex flex-col w-full">
              <div className="font-semibold mb-3">{match.teamB} </div>
              <div>
                {match.authorsB?.map((author, index) => (
                  <div
                    key={index}
                    className="flex flex-row gap-3 text-sm text-center w-full"
                  >
                    <div className="">
                      {author.goal} <i className="fa-solid fa-futbol"></i>
                    </div>
                    <div className="text-violet-900">
                      {author.assist}{" "}
                      <i className="fa-solid fa-handshake-simple"></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
