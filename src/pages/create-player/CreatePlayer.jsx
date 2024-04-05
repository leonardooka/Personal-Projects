import React from "react";
import Header from "../../components/header/header";
import Button from "../../components/button/button";

export default function CreatePlayer() {
  return (
    <div className="bg-bg7 bg-cover bg-no-repeat bg-center flex-col justify-center items-center content-center size-full">
      <Header
        children="Create Player"
        fontSize={"text-6xl"}
        className={"mb-5"}
      />
      <div className="w-3/5 m-auto flex flex-col items-center content-center p-4 bg-gradient-to-br bg-white border-4 border-violet-500 rounded-xl bg-opacity-70 h-3/4">
        <label htmlFor="name" className="text-4xl">
          Team:
        </label>
        <input
          name="team-dropdown"
          type="text"
          placeholder="dropdown here"
          className="mt-3 w-1/4 h-7 rounded border border-violet-400 text-gray-800 focus:outline-none focus:ring-violet-600 focus:ring-1"
        />
        <div className="flex justify-between size-full p-3">
          <div className="flex flex-col w-3/5 py-3">
            <label htmlFor="name" className="text-xl">
              Player name
            </label>
            <input
              name="name"
              type="text"
              className="mt-3 w-2/4 rounded border border-violet-400 text-gray-800 focus:outline-none focus:ring-violet-600 focus:ring-1"
            ></input>
            <label htmlFor="position" type="text" className="mt-5 text-xl">
              Position
            </label>
            <input
              name="position"
              type="text"
              placeholder="  Dropdown here"
              className="mt-3 w-36 rounded border border-violet-400 text-gray-800 focus:outline-none focus:ring-violet-600 focus:ring-1"
            ></input>
            <label htmlFor="country" type="text" className="mt-5 text-xl">
              Player country TAG
            </label>
            <input
              name="country"
              type="text"
              placeholder="  Three caracters only"
              className="mt-3 w-36 rounded border border-violet-400 text-gray-800 focus:outline-none focus:ring-violet-600 focus:ring-1"
            ></input>
            <Button children={"ADD"} size={"mt-10 w-40 h-12"} />
          </div>
          <div className="w-2/5 border-2 p-3">
            <label>Team Players</label>
          </div>
        </div>
      </div>
    </div>
  );
}
