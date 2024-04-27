import React, { createRef, useEffect, useState } from "react";
import Header from "../../components/header/header";
import Button from "../../components/button/button";
import { Link } from "react-router-dom";
import { allRounds } from "../../matchmaking/matchmaking";
import { postDataToDatabase } from "../../database";
import databaseUrl from "../../databaseUrl";

export default function CreateLeague() {
  const [loading, setLoading] = useState(true);
  const [teamsData, setTeamsData] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [standings, setStandings] = useState([]);
  const [allTeams, setAllTeams] = useState(null);
  const [insuficientTeams, setInsuficientTeams] = useState(true);
  const [leagueCreated, setLeagueCreated] = useState(false);
  const [leagueName, setLeagueName] = useState(null);

  const ref = createRef();

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

  async function fetchTeamsData() {
    setLoading(true);
    try {
      const response = await fetch(`${databaseUrl()}/teams`);
      const data = await response.json();

      if (data?.length) {
        setTeamsData(data);
        const teams = [];
        data.map((team) => teams.push(team));
        if (teams.length) {
          setAllTeams(alphabeticalSort(teams));
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTeamsData();
  }, []);

  useEffect(() => {
    selectedTeams.length < 4
      ? setInsuficientTeams(true)
      : setInsuficientTeams(false);
  }, [selectedTeams]);

  function handleChange(e) {
    setLeagueCreated(false);
    const chosenTeam = e.target.value;
    if (e.target.value !== "") {
      const pickedTeam = teamsData.filter(
        (team) => team.name === chosenTeam
      )[0];
      const pickedTeamStanding = {
        team: chosenTeam,
        pts: 0,
        games: 0,
        victories: 0,
        draws: 0,
        losses: 0,
        gf: 0,
        ga: 0,
        gd: 0,
      };

      const updatedAllTeams = allTeams.filter(
        (team) => team.name !== pickedTeam.name
      );
      const updatedSelectedTeams = [...selectedTeams, pickedTeam];
      const updatedStandings = [...standings, pickedTeamStanding];

      setAllTeams(alphabeticalSort(updatedAllTeams));
      setSelectedTeams(alphabeticalSort(updatedSelectedTeams));
      setStandings(updatedStandings);
    }
    e.target.value = "";
  }

  function handleClickExcludeTeam(excludeTeam) {
    const updatedAllTeams = [...allTeams, excludeTeam];
    const updatedSelectedTeams = selectedTeams.filter(
      (team) => team.name !== excludeTeam.name
    );
    const updatedStandings = standings.filter(
      (standing) => standing.team !== excludeTeam.name
    );

    setAllTeams(alphabeticalSort(updatedAllTeams));
    setSelectedTeams(alphabeticalSort(updatedSelectedTeams));
    setStandings(updatedStandings);
  }

  function handleSubmit() {
    const submitName = ref.current.value;
    setLeagueName(leagueName);
    const submitData = {
      name: submitName,
      teams: JSON.stringify(selectedTeams),
      standings: JSON.stringify(standings),
      matches: JSON.stringify(allRounds(selectedTeams)),
    };

    postDataToDatabase(submitData, "add-league", "POST");
    setLeagueCreated(true);

    if (selectedTeams.length) {
      ref.current.value = "";
      setSelectedTeams([]);
      setAllTeams(teamsData);
      setInsuficientTeams(true);
    }
  }

  return (
    <div className="flex-col size-full justify-center item-center content-center">
      <Header
        children="Create League"
        fontSize={"text-6xl"}
        className={"mb-10"}
      />
      {loading ? (
        <div className="text-md m-auto mt-10">Loading...</div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-3/5 m-auto flex flex-col items-center content-center p-4 bg-gradient-to-br bg-white border-4 border-violet-500 rounded-xl bg-opacity-70 h-3/4"
        >
          <label htmlFor="name" className="text-4xl">
            League name:
          </label>
          <input
            name="name"
            id="name"
            ref={ref}
            required
            minLength="2"
            type="text"
            placeholder=" league name required"
            className="mt-3 w-2/4 h-8 rounded text-gray-800 border border-violet-400 focus:outline-none focus:ring-violet-600 focus:ring-1"
          />
          <label htmlFor="matches"></label>
          <label htmlFor="addteam" className="mt-5 text-xl">
            Add Team
          </label>
          <select
            id="addteam"
            className="px-3"
            defaultValue=""
            onChange={handleChange}
          >
            <option value="">select a team</option>
            {allTeams
              ? allTeams.map((team, index) => (
                  <option key={index} value={team.name}>
                    {team.name}
                  </option>
                ))
              : null}
          </select>
          <div className="mt-3 flex-col w-full h-3/5 p-3">
            <label className="text-3xl ml-3">
              Teams
              <span className="ml-2 text-sm font-semibold text-violet-600">
                {selectedTeams.length} Added (minimun 4)
              </span>
            </label>
            {leagueCreated ? (
              <div className="text-gray-800 font-semibold text-center text-lg">
                League sucessfully created!
              </div>
            ) : null}
            <div className="w-full rounded grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 auto-cols-min gap-2 p-3 mt-2 max-h-[360px] overflow-auto scroll-smooth">
              {!loading
                ? selectedTeams?.map((team, index) => (
                    <div
                      key={index}
                      className="h-12 border p-1 bg-white bg-opacity-80 border-violet-600 rounded flex justify-between content-center items-center"
                    >
                      <div className="h-12 flex items-center text-sm">
                        <img className="h-8 mr-3" src={team.logo} />
                        <label>
                          {team.name} ({team.country_tag})
                        </label>
                      </div>
                      <div
                        className="rounded bg-violet-400 px-1 text-white text-xs font-semibold cursor-pointer"
                        onClick={() => handleClickExcludeTeam(team)}
                      >
                        X
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
          {insuficientTeams ? (
            <Button
              isDisabled={true}
              children={"CREATE"}
              size={"mt-12 w-36 h-10"}
            />
          ) : (
            <Button
              isDisabled={false}
              submit={true}
              disabled
              children={"CREATE"}
              size={"mt-12 w-36 h-10"}
            />
          )}
        </form>
      )}
    </div>
  );
}
