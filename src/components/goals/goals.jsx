import React from "react";
import { sortPlayerRank } from "../../matchmaking/matchmaking";

export default function Goals({ allPlayers, leagueId }) {
  const haveGoalsPlayers = allPlayers.filter(
    (player) =>
      player.goals !== null &&
      player.goals.find((obj) => obj.league == leagueId)
  );
  console.log(haveGoalsPlayers);
  const players = sortPlayerRank(haveGoalsPlayers, leagueId, "goals");

  return (
    <div className="size-full flex flex-col">
      <div className="text-center mb-3 text-2xl font-semibold text-gray-800">
        Top Scorers
      </div>
      <div className="overflow-auto max-h-[80%] scroll-smooth">
        <table className="border-collapse border-2 border-violet-700 m-auto">
          <thead>
            <tr className="bg-violet-600 border-2 border-violet-700 text-white">
              <th className="px-2">POS</th>
              <th className="px-2 text-left">PLAYER</th>
              <th className="px-2 text-left">TEAM</th>
              <th className="px-2">POSITION</th>
              <th className="px-2">GOALS</th>
            </tr>
          </thead>
          {players ? (
            <tbody>
              {players.map((player, index) => {
                const leagueGoalIndex = player.goals.findIndex(
                  (obj) => obj.league == leagueId
                );
                return (
                  <tr
                    key={index}
                    className={index % 2 !== 0 ? "bg-violet-300" : "bg-white"}
                  >
                    <td className="px-2 text-center">{index + 1}</td>
                    <td className="px-2">
                      {player.name} ({player.country_tag})
                    </td>
                    <td className="px-2">{player.team}</td>
                    <td className="px-2 text-center">
                      {player.position.slice(5, 7)}
                    </td>
                    <td className="px-2 text-center">
                      {player.goals[leagueGoalIndex].goals}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <div>No players scores a goal yet</div>
          )}
        </table>
      </div>
    </div>
  );
}
