import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Button from "../../components/button/button";
import "./styles.css";
import { useLocation, useParams } from "react-router-dom";
import Standings from "../../components/standings/Standings";
import Assists from "../../components/assists/assists";
import Goals from "../../components/goals/goals";
import Matches from "../../components/matches/Matches";

export default function League() {
  const [leagueStandings, setLeagueStandings] = useState(null);
  const [league, setLeague] = useState(null);
  const [allPlayers, setAllPlayers] = useState(null);
  const [contentType, setContentType] = useState("standings");
  const [loadingLeague, setLoadingLeague] = useState(false);
  const [loadingPlayers, setLoadingPlayers] = useState(false);
  const { leagueId } = useParams();

  async function fetchLeague() {
    try {
      const response = await fetch(`http://127.0.0.1:5001/leagues/${leagueId}`);
      const data = await response.json();

      if (data) {
        setLeagueStandings(data.standings);
        setLeague(data);
        setLoadingLeague(false);
      }
    } catch (e) {
      setLoadingLeague(false);
      console.log("league fetch error", e);
    }
  }

  async function fetchPlayers() {
    try {
      const response = await fetch("http://127.0.0.1:5001/players");
      const data = await response.json();

      if (data?.length) {
        setAllPlayers(data);
        setLoadingPlayers(false);
      }
    } catch (e) {
      setLoadingPlayers(false);
      console.log("player fetch error", e);
    }
  }

  useEffect(() => {
    fetchLeague();
    fetchPlayers();
  }, []);

  function handleClickContent(contentType) {
    setContentType(contentType);
  }

  return (
    <div className="league-background bg-center bg-cover bg-no-repeat flex-col size-full justify-center item-center content-center">
      <Header
        children={league?.name}
        fontSize={"text-6xl"}
        className={"mb-10"}
      />
      <div className="w-4/5 h-4/5 m-auto flex flex-row">
        <div className="w-1/5 h-full p-3 space-y-5">
          <Button
            children={"TABLE"}
            size={"h-16 w-8/9"}
            onClick={() => handleClickContent("standings")}
          />
          <Button
            children={"GOALS"}
            size={"h-16 w-8/9"}
            onClick={() => handleClickContent("goals")}
          />
          <Button
            children={"ASSISTS"}
            size={"h-16 w-8/9"}
            onClick={() => handleClickContent("assists")}
          />
          <Button
            children={"MATCHES"}
            size={"h-16 w-8/9"}
            onClick={() => handleClickContent("matches")}
          />
        </div>

        <div className="w-5/6 h-full m-auto flex flex-col items-center content-center p-4 bg-gradient-to-br bg-white border-4 border-violet-500 rounded-xl bg-opacity-70">
          {loadingLeague || loadingPlayers ? (
            <div>Loading...</div>
          ) : (
            <div className="size-full">
              {contentType === "standings" && leagueStandings ? (
                <Standings standings={leagueStandings} />
              ) : null}
              {contentType === "goals" && allPlayers ? (
                <Goals allPlayers={allPlayers} leagueId={leagueId} />
              ) : null}
              {contentType === "assists" && allPlayers ? (
                <Assists allPlayers={allPlayers} leagueId={leagueId} />
              ) : null}
              {contentType === "matches" && allPlayers && league ? (
                <Matches
                  league={league}
                  allPlayers={allPlayers}
                  leagueId={leagueId}
                />
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
