import React from "react";
import Header from "../../components/header/header";
import Button from "../../components/button/button";
import { Link } from "react-router-dom";

export default function AllLeagues() {
  return (
    <div className="bg-bg6 bg-cover bg-center bg-no-repeat size-full space-y-10">
      <Header children="All Leagues" fontSize={"text-6xl"} className={"my-5"} />
      <div className="container flex flex-col space-y-10 m-auto">
        <Link to="/league/1">
          <div className="flex-col bg-white bg-opacity-70 h-24 w-3/5 rounded m-auto p-3">
            <div className="text-xl font-bold opacity-100">
              <span>Campeonato Brasileiro</span>
            </div>
            <div className="flex justify-between mt-3">
              <span>20 teams</span>
              <span>Round: 18</span>
              <span className="text-green-600 font-semibold">ACTIVE</span>
            </div>
          </div>
        </Link>
        <div className="flex-col bg-white bg-opacity-70 h-24 w-3/5 rounded m-auto p-3">
          <div className="text-xl font-bold flex justify-between">
            <span>Champions League</span>
            <span className="text-red-500">Champion: Real Madrid</span>
          </div>
          <div className="flex justify-between mt-3">
            <span>32 teams</span>
            <span>Round: 62</span>
            <span className="text-blue-600 font-semibold">FINISHED</span>
          </div>
        </div>
        <div className="flex bg-white bg-opacity-70 h-24 w-3/5 rounded m-auto p-3"></div>
        <div className="flex bg-white bg-opacity-70 h-24 w-3/5 rounded m-auto p-3"></div>
      </div>
      <Link to="/create-league">
        <Button children="create new league" size={"w-1/4 h-12 m-auto mt-10"} />
      </Link>
    </div>
  );
}
