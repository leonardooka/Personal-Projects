import React from "react";
import Header from "../../components/header/header";

export default function AllPlayers() {
  return (
    <div className="bg-bg5 bg-center bg-cover bg-no-repeat flex-col size-full">
      <Header children="All Players" fontSize={"text-6xl"} className={"mt-5"} />
      <div>
        <table className="table-auto w-2/3 m-auto mt-10 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 text-white border-collapse border-2 border-violet-500">
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
            <tr>
              <td className="pl-2">Pedro</td>
              <td className="pl-3">CA</td>
              <td className="pl-3">Flamengo</td>
              <td className="text-center">12</td>
              <td className="text-center">3</td>
            </tr>
            <tr>
              <td className="pl-2">Pedro</td>
              <td className="pl-3">CA</td>
              <td className="pl-3">Flamengo</td>
              <td className="text-center">12</td>
              <td className="text-center">3</td>
            </tr>
            <tr>
              <td className="pl-2">Pedro</td>
              <td className="pl-3">CA</td>
              <td className="pl-3">Flamengo</td>
              <td className="text-center">12</td>
              <td className="text-center">3</td>
            </tr>
            <tr>
              <td className="pl-2">Pedro</td>
              <td className="pl-3">CA</td>
              <td className="pl-3">Flamengo</td>
              <td className="text-center">12</td>
              <td className="text-center">3</td>
            </tr>
            <tr>
              <td className="pl-2">Pedro</td>
              <td className="pl-3">CA</td>
              <td className="pl-3">Flamengo</td>
              <td className="text-center">12</td>
              <td className="text-center">3</td>
            </tr>
            <tr>
              <td className="pl-2">Pedro</td>
              <td className="pl-3">CA</td>
              <td className="pl-3">Flamengo</td>
              <td className="text-center">12</td>
              <td className="text-center">3</td>
            </tr>
            <tr>
              <td className="pl-2">Pedro</td>
              <td className="pl-3">CA</td>
              <td className="pl-3">Flamengo</td>
              <td className="text-center">12</td>
              <td className="text-center">3</td>
            </tr>
            <tr>
              <td className="pl-2">Pedro</td>
              <td className="pl-3">CA</td>
              <td className="pl-3">Flamengo</td>
              <td className="text-center">12</td>
              <td className="text-center">3</td>
            </tr>
            <tr>
              <td className="pl-2">Pedro</td>
              <td className="pl-3">CA</td>
              <td className="pl-3">Flamengo</td>
              <td className="text-center">12</td>
              <td className="text-center">3</td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}
