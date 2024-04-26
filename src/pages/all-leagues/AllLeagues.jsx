import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Button from "../../components/button/button";
import { Link } from "react-router-dom";
import {postDataToDatabase} from "../../database";

export default function AllLeagues() {
  const [allLeagues, setAllLeagues] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchLeagues () {
    setLoading(true)
    try {
      const response = await fetch("http://127.0.0.1:5001")
      const data = await response.json()

      if (data?.length) {
        setAllLeagues(data)
        console.log(data)
      }
      setLoading(false)
      console.log('fetching complete')
    } catch (err) {
      console.log(err.message)
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchLeagues();
  }, []);

  function handleClickDelete (currentLeague, event) {
    event.stopPropagation();
    event.preventDefault();
    postDataToDatabase(currentLeague, `delete-league`, "DELETE");
    const allLeaguesClone = allLeagues
    const updatedLeagues = allLeaguesClone.filter((league) => league.league_id !== currentLeague.league_id)
    setAllLeagues(updatedLeagues)
    setLoading(false)
  }

  return (
    <div className="bg-bg8 bg-cover bg-center bg-no-repeat size-full space-y-10">
      <Header children="All Leagues" fontSize={"text-6xl"} className={"my-5"} />
      {!loading ? (
        <div className="container flex flex-col space-y-10 m-auto overflow-auto max-h-[590px] scroll-smooth">
          {allLeagues?.map((league, index) => {
            return (
              <Link key={index} to={`/leagues/${league.league_id}`}>
                <div
                  key={index}
                  className="flex-col bg-white bg-opacity-70 h-24 w-3/5 rounded m-auto p-3"
                >
                  <div className="text-xl font-bold flex justify-between">
                    <span>{league.name}</span>
                    {
                      league.matches.filter(round => round.status === 'complete').length === league.teams.length-1 
                      ? (<span className="text-red-600">Champion: {league.standings[0].team}</span>)
                      : (<span className="text-blue-600">Leader: {league.standings[0].team}</span>)
                    }
                  </div>
                  <div className="flex justify-between mt-3">
                    <span>{league.teams.length} teams</span>
                    <span>Round: {league.matches.filter((round) => 
                      round.status === 'complete'
                    ).length}</span>
                    {
                      league.matches.filter(round => round.status === 'complete').length === league.teams.length-1 
                      ? (<span className="text-blue-600 font-semibold">FINISHED</span>)
                      : (<span className="text-green-600 font-semibold">ACTIVE</span>)
                    }
                    <button className="bg-red-500 text-white px-2 py-1  rounded text-sm" onClick={(e) => handleClickDelete(league, e)}>Delete League</button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-white text-xl font-semibold mt-10 text-center">Loading...</div>
      )}

      <Link to="/create-league">
        <Button children="create new league" size={"w-1/4 h-12 m-auto mt-10"} />
      </Link>
    </div>
  );
}
