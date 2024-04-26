import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import { Link } from "react-router-dom";
import Button from "../../components/button/button";
import AllTeams from "../all-teams/AllTeams";

export default function AllPlayers() {
  const [allPlayers, setAllPlayers] = useState(null);
  const [loading, setLoading] = useState(false);

  function alphabeticalSort(list) {
    return list.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  async function fetchAllPlayers() {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5001/players");
      const data = await response.json();

      if (data?.length) {
        setAllPlayers(alphabeticalSort(data));
      }
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  }

  useState(() => {
    fetchAllPlayers();
  }, []);

  return (
    <div className="bg-bg5 bg-center bg-cover bg-no-repeat flex-col size-full">
      <Header children="All Players" fontSize={"text-6xl"} className={"mt-5"} />
      <Link to="/create-player">
        <Button children="Create Player" size={"m-auto w-48 mt-10"} />
      </Link>
      <div className="mt-10 overflow-auto max-h-[70%] scroll-smooth">
        {loading ? (
          <div className="m-auto text-xl text-center text-white">Loading...</div>
        ) : (
          <table className="table-auto w-2/3 m-auto bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 text-white border-collapse border-2 border-violet-500">
            <thead>
              <tr className="pl-5 text-left border-2 border-violet-500 text-yellow-400">
                <th className="pl-2 pr-64 p-2">Name</th>
                <th className="pl-2 pr-8 p-2">Position</th>
                <th className="pl-3 pr-32 p-2">Team</th>
                <th className="pl-2 p-2">Goals</th>
                <th className="pl-2 p-2">Assists</th>
              </tr>
            </thead>
            <tbody>
              {allPlayers?.map((player) => (
                <tr>
                  <td className="pl-2">{player.name}</td>
                  <td className="pl-3">{player.position.slice(5,7)}</td>
                  <td className="pl-3">{player.team}</td>
                  <td className="text-center">{player.goals? player.goals.reduce((total, league) => total + league.goals, 0) : 0}</td>
                  <td className="text-center">{player.assists? player.assists.reduce((total, league) => total + league.assists, 0) : 0}</td>
                </tr>
              ))}
              <tr>
                <td className="pl-2">Pedro</td>
                <td className="pl-3">CA</td>
                <td className="pl-3">Flamengo</td>
                <td className="text-center">12</td>
                <td className="text-center">3</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
