import React, { useState } from "react";
import { sortStandings } from "../../matchmaking/matchmaking";

export default function Standings({ standings}) {
  let sortedStandings = sortStandings(standings) 

  return (
    <div>
      <div className="text-center mb-5 text-2xl font-semibold text-gray-800">
        Standings
      </div>
      <div className="flex justify-center overflow-auto max-h-[650px] scroll-smooth">
        <table className="border-collapse border-2 border-violet-700">
          <thead className="border-2 border-violet-700 bg-violet-600 text-white">
            <tr>
              <th className="px-2">POS</th>
              <th className="px-2 text-left">TEAM</th>
              <th className="px-2">PTS</th>
              <th className="px-2">G</th>
              <th className="px-2">V</th>
              <th className="px-2">D</th>
              <th className="px-2">L</th>
              <th className="px-2">GF</th>
              <th className="px-2">GA</th>
              <th className="px-2">GD</th>
            </tr>
          </thead>
          <tbody>
            {sortedStandings.map((teamStanding, index) => {
              return (
                <tr
                  key={index}
                  className={index % 2 !== 0 ? "bg-violet-200" : "bg-white"}
                >
                  <td className="px-2 text-center">{index + 1}</td>
                  <td className="px-2">{teamStanding.team}</td>
                  <td className="px-2 text-center">{teamStanding?.pts || 0}</td>
                  <td className="px-2 text-center">
                    {teamStanding?.games || 0}
                  </td>
                  <td className="px-2 text-center">
                    {teamStanding.victories || 0}
                  </td>
                  <td className="px-2 text-center">
                    {teamStanding?.draws || 0}
                  </td>
                  <td className="px-2 text-center">
                    {teamStanding.losses || 0}
                  </td>
                  <td className="px-2 text-center">{teamStanding?.gf || 0}</td>
                  <td className="px-2 text-center">{teamStanding?.ga || 0}</td>
                  <td className="px-2 text-center">{teamStanding?.gd || 0}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
