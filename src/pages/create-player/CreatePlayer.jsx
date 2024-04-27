import React, { createRef, useEffect, useState } from "react";
import Header from "../../components/header/header";
import Button from "../../components/button/button";
import { postDataToDatabase } from "../../database";

// usar o state loading
// deixar a posição dinâmica
// não permitir mais adicionar jogador caso chegue a 11 jogadores
// por mensagem que já alcançou o limite de jogadores e (team complete!)
// por para poder deletar o jogador

export default function CreatePlayer() {
  const [allTeams, setAllTeams] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [teamData, setTeamData] = useState("");
  const [playerAdded, setPlayerAdded] = useState(false);
  const [teamIsFull, setTeamIsFull] = useState(false);
  const [loading, setLoading] = useState(true);
  const positions = [
    "01 - GK (goalkeeper)",
    "02 - CB (defender)",
    "03 - CB (defender)",
    "04 - RB (right-back)",
    "05 - LB (left-back)",
    "06 - DM (defensive midfield)",
    "07 - DM (defensive midfield)",
    "08 - AM (ofensive midfield)",
    "09 - AM (ofensive midfield)",
    "10 - ST (striker)",
    "11 - ST (striker)",
  ];

  const nameRef = createRef();
  const positionRef = createRef();
  const countryRef = createRef();
  const teamRef = createRef();

  function handleChange(e) {
    if (e.target.value !== "") {
      setSelectedTeam(e.target.value);
    }
  }

  function handlePositionChange(e) {
    if (e.target.value !== "") {
      const position = e.target.value;
      setSelectedPosition(position);
    }
  }

  function handleClick() {
    setPlayerAdded(true);
  }

  function handleSubmit() {
    const sendingData = {
      name: nameRef.current.value,
      position: positionRef.current.value,
      country_tag: countryRef.current.value,
      team: teamRef.current.value
    }

    postDataToDatabase(sendingData, 'add-player', 'POST');
    nameRef.current.value = ''
    positionRef.current.value = ''
    countryRef.current.value = ''
  }

  useEffect(() => {
    console.log("--start useEffect team");
    setLoading(true);
    const API = `${databaseUrl()}/teams`;
    const getAPI = () => {
      fetch(API)
        .then((res) => res.json())
        .then((data) => {
          setAllTeams(data);
          if (selectedTeam !== "") {
            setTeamData(data.filter((team) => team.name === selectedTeam)[0]);
          }
          setPlayerAdded(false);
          setLoading(false);
        })
        .catch((err) => console.log("allteams dataload error", err));
    };
    getAPI();
  }, [selectedTeam]);

  useEffect(() => {
    console.log("--start useEffect players");
    setLoading(true);
    const API = `http://127.0.0.1:5001/players`;
    const getAPI = () => {
      fetch(API)
        .then((res) => res.json())
        .then((data) => {
          const matchedTeamPlayers =
            data.filter((player) => player.team === selectedTeam) || [];

          matchedTeamPlayers.sort((a, b) => {
            if (a.position < b.position) {
              return -1;
            }
            if (a.position > b.position) {
              return 1;
            }
            return 0;
          });

          setAllPlayers(matchedTeamPlayers);
          setTeamIsFull(matchedTeamPlayers.length === 11 ? true : false);
          setLoading(false);
          setPlayerAdded(false);
        })
        .catch((err) => console.log("get players data error", err));
    };
    getAPI();
  }, [selectedTeam, playerAdded]);

  return (
    <div className="bg-bg7 bg-cover bg-no-repeat bg-center flex-col justify-center items-center content-center size-full">
      <Header
        children="Create Player"
        fontSize={"text-6xl"}
        className={"mb-5"}
      />
      <div className="w-3/5 m-auto flex flex-col items-center content-center p-4 bg-gradient-to-br bg-white border-4 border-violet-500 rounded-xl bg-opacity-70 h-3/4">
        {loading ? (
          <div className="text-gray-400 font-semibold text-xl">Loading...</div>
        ) : (
          <div className="flex justify-between size-full p-3">
            <form
              method="POST"
              action="http://127.0.0.1:5001/add-player"
              onSubmit={handleSubmit}
              className="flex flex-col w-3/5 py-3"
            >
              <label htmlFor="team" className="text-4xl">
                Team:
              </label>
              <select
                name="team"
                ref={teamRef}
                type="text"
                required
                value={selectedTeam}
                onChange={handleChange}
                className="mt-3 w-2/4 h-7 rounded border border-violet-400 text-gray-800 focus:outline-none focus:ring-violet-600 focus:ring-1"
              >
                <option value="">select a team</option>
                {allTeams.map((team, index) => {
                  return (
                    <option key={index} value={team.name}>
                      {team.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="name" className="text-xl mt-5">
                Player name
              </label>
              <input
                name="name"
                ref={nameRef}
                type="text"
                maxLength="50"
                required
                className="mt-3 w-2/4 h-7 rounded border border-violet-400 text-gray-800 focus:outline-none focus:ring-violet-600 focus:ring-1"
              ></input>
              <label htmlFor="position" type="text" className="mt-5 text-xl">
                Position
              </label>
              <select
                name="position"
                ref={positionRef}
                type="text"
                required
                onChange={handlePositionChange}
                className="mt-3 w-52 h-7 rounded border border-violet-400 text-gray-800 focus:outline-none focus:ring-violet-600 focus:ring-1"
              >
                <option value="">select position</option>
                {positions.map((pos, index) => (
                  <option key={index} value={pos.slice(0, 7)}>
                    {pos}
                  </option>
                ))}
              </select>
              <div className="mt-2 mr-10 text-gray-700">
                Hint: make your team with: 1 GK, 2 CB, 1 LB, 1 RB, 2 DM, 2 AM
                and 2 ST
              </div>
              <label htmlFor="country" type="text" className="mt-5 text-xl">
                Player country TAG
              </label>
              <input
                name="country_tag"
                ref={countryRef}
                type="text"
                maxLength="3"
                minLength="3"
                placeholder="  3 characters only"
                className="mt-3 w-36 h-7 rounded border border-violet-400 text-gray-800 focus:outline-none focus:ring-violet-600 focus:ring-1"
              ></input>
              {teamIsFull ? (
                <Button
                  type="submit"
                  onClick={handleClick}
                  isDisabled={true}
                  children={"ADD"}
                  size={"mt-5 mb-5 w-40 h-12"}
                />
              ) : (
                <Button
                  type="submit"
                  onClick={handleClick}
                  isDisabled={false}
                  children={"ADD"}
                  size={"mt-5 w-40 h-12"}
                />
              )}
              {teamIsFull ? (
                <div className="mt-3 text-red-600 font-semibold text-lg">
                  This team is complete!
                </div>
              ) : null}
            </form>

            <div
              className={`w-2/5 border-2 rounded ${
                teamIsFull
                  ? "border-violet-500 shadow-xl shadow-violet-300"
                  : null
              } p-3 flex flex-col`}
            >
              {selectedTeam.length ? (
                <div className="flex flex-col relative">
                  <div className="font-bold text-xl">
                    {teamData.name} ({teamData.tag})
                  </div>
                  <label className="my-3 text-xl font-semibold">Squad</label>
                  <img
                    className="m-auto mt-20 w-4/5 opacity-30"
                    src={teamData.logo}
                  />
                </div>
              ) : (
                <h1 className="m-auto text-2xl text-gray-600 font-semibold">
                  Select a Team First
                </h1>
              )}
              <div className="mt-20 w-1/5 flex flex-col absolute divide-y divide-gray-500">
                {allPlayers?.map((player) => {
                  return (
                    <div
                      key={player.player_id}
                      className="flex flex-row p-1 text-sm font-medium"
                    >
                      <div className="w-1/6">
                        {player.position.slice(5, 7).toUpperCase()}
                      </div>
                      <div className="w-5/6">{player.name}</div>
                      <div className="w-1/6">
                        {player.country_tag.toUpperCase()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
