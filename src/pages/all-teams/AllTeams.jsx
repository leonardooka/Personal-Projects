import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Button from "../../components/button/button";
import { Link } from "react-router-dom";

export default function AllTeams() {
  const [allTeams, setAllTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    const getAPI = () => {
      const API = "http://127.0.0.1:5001/teams";
      fetch(API)
        .then((res) => res.json())
        .then((data) => {
          setAllTeams(data);
          console.log(allTeams);
          setLoading(false);
        })
        .catch((err) => console.log("fetchAPI allteams failed", err));
    };
    getAPI();
  }, []);

  return (
    <div className="size-full bg-bg2 bg-cover bg-center bg-no-repeat">
      <Header children="All Teams" fontSize={"text-6xl"} className={"mt-5"} />
      <Link to="/create-team">
        <Button children="Add Team" size={"m-auto w-48 mt-10"} />
      </Link>
      {loading ? (
        <h2>Loading Teams...</h2>
      ) : (<div>{
          allTeams.length
          ? (<div className="m-auto grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 auto-cols-min gap-5 p-5 mt-10 overflow-auto max-h-[700px] scroll-smooth">
          {allTeams.map((team, index) => {
            return (
              <div key={index}>
                <Link to={`/teams/${team.team_id}`}>
                  <div className="w-full h-24 flex flex-row items-center p-5 bg-white bg-opacity-70 rounded-xl border-2 border-violet-500">
                    <div className="w-14 h-16">
                      <img className="w-full mt-1" src={team.logo} />
                    </div>
                    <div className="ml-5 font-bold">
                      {team.name} ({team.country_tag})
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
          </div>)
         : (<h1 className="text-white mt-10 font-bold text-2xl text-center">No teams registered yet. Click the button above to create new teams!</h1>)
      }</div>)
          
        }
    </div>
  );
}
