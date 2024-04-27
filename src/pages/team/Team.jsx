import React, { useEffect, useState } from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import Header from "../../components/header/header";
import databaseUrl from "../../databaseUrl";

export default function Team() {
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { teamId } = useParams();

  function alphabeticalSort(list) {
    return list.sort((a, b) => {
      if (a.position < b.position) {
        return -1;
      }
      if (a.position > b.position) {
        return 1;
      }
      return 0;
    });
  }

  useEffect(() => {
    setLoading(true);
    async function fetchTeam() {
      try {
        const response = await fetch(`${databaseUrl()}/teams`);
        const data = await response.json();
        console.log(data);

        if (data?.length) {
          const filteredTeam = data.filter((team) => team.team_id == teamId)[0];
          setTeam(filteredTeam);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchTeam();
  }, []);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        console.log(team);
        const response = await fetch("http://127.0.0.1:5001/players");
        const data = await response.json();

        if (data?.length && team.name) {
          const filteredPlayers = data.filter(
            (player) => player.team === team.name
          );
          setPlayers(alphabeticalSort(filteredPlayers));
          setLoading(false);
        }
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    }
    fetchPlayers();
  }, [team])

  return (
    <div className="team-background size-full item-center content-center justify-center p-20">
      <Header children="Team Squad" fontSize={"text-6xl"} className={"mt-5"} />
      {!loading && team ? (
        <div className="mt-10 m-auto w-3/4 h-5/6 flex flex-row items-center content-center p-4 bg-gradient-to-br bg-white border-4 border-violet-500 rounded-xl bg-opacity-70">
          <div className="w-2/5 flex items-center h-full border-2 border-blue-400 bg-gradient-to-br from-blue-500 via-purple-800 to-blue-500">
            <img src={team.logo} />
          </div>
          <div className="flex flex-col w-3/5 h-full items-center pl-10">
            <div className="text-4xl font-semibold text-indigo-900">
              {team.name} - {team.country_tag}
            </div>
            <div className="w-full mt-5 bg-gradient-to-br from-indigo-700 via-indigo-900 to-indigo-600">
              {players?.length ? players.map((player, index) => (
                <div key={index} className="flex w-full border-y-2">
                  <div className="text-center w-1/6 py-1 text-white font-semibold text-md">
                    {player.position.slice(5, 7)}
                  </div>
                  <div className="text-left w-5/6 px-3 py-1 text-yellow-400 text-xl">
                    {player.name} ({player.country_tag})
                  </div>
                </div>
              )) : (<div className="font-semibold text-lg text-white">No players registered yet</div>)}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
