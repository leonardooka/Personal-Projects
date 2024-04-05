import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/main/MainPage";
import AllTeams from "./pages/all-teams/AllTeams";
import AllPlayers from "./pages/all-players/AllPlayers";
import CreateTeam from "./pages/create-team/CreateTeam";
import CreatePlayer from "./pages/create-player/CreatePlayer";
import CreateLeague from "./pages/create-league/CreateLeague";
import AllLeagues from "./pages/all-leagues/AllLeagues";
import League from "./pages/league/League";
import Team from "./pages/team/Team";

function App() {
  return (
    <>
      <div className="background-image size-full flex flex-col items-center content-center">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/create-league" element={<CreateLeague />} />
          <Route path="/create-team" element={<CreateTeam />} />
          <Route path="/create-player" element={<CreatePlayer />} />
          <Route path="/all-leagues" element={<AllLeagues />} />
          <Route path="/all-teams" element={<AllTeams />} />
          <Route path="/all-players" element={<AllPlayers />} />
          <Route path="/league/:league_id" element={<League />} />
          <Route path="/team/:team_id" element={<Team />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
