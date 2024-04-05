import React from "react";
import Button from "../../components/button/button";
import Header from "../../components/header/header";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div className="bg-bg1 bg-center bg-cover bg-no-repeat size-full flex content-center justify-center flex-col space-y-5 pb-20">
      <Header children={'League Simulator'} className={'mt-7'}/>
      <div className="w-full flex content-center justify-center flex-col space-y-10 pb-44">
        <Link to="/create-league">
          <Button children={"NEW LEAGUE"} size={"w-2/5 h-16 m-auto"} />
        </Link>
        <Link to="/all-leagues">
          <Button children={"SAVED LEAGUES"} size={"w-2/5 h-16 m-auto"} />
        </Link>
        <Link to="/all-teams">
          <Button children={"TEAMS"} size={"w-2/5 h-16 m-auto"} />
        </Link>
        <Link to="/all-players">
          <Button children={"PLAYERS"} size={"w-2/5 h-16 m-auto mb-2"} />
        </Link>
      </div>
    </div>
  );
}
