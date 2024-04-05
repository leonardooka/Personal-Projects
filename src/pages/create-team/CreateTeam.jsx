import React from "react";
import Header from "../../components/header/header";
import Button from "../../components/button/button";

export default function CreateTeam() {
  return (
    <div className="bg-bg3 bg-cover bg-center bg-no-repeat flex-col justify-center items-center content-center size-full">
      <Header
        children="Create Team"
        fontSize={"text-6xl"}
        className={"mb-10"}
      />
      <div className="w-3/5 m-auto flex flex-col items-center content-center p-4 bg-gradient-to-br bg-white border-4 border-violet-500 rounded-xl bg-opacity-70 h-3/4">
        <label htmlFor="name" className="text-4xl">
          Team name:
        </label>
        <input
          name="name"
          type="text"
          className="mt-3 w-2/4 h-8 rounded border border-violet-400 text-gray-800 focus:outline-none focus:ring-violet-600 focus:ring-1"
        />
        <label htmlFor="logo" type="text" className="mt-5 text-xl">
          Team Logo
        </label>
        <input
          name="logo"
          type="text"
          placeholder="  URL only"
          className="mt-3 w-2/4 rounded border border-violet-400 text-gray-800 focus:outline-none focus:ring-violet-600 focus:ring-1"
        ></input>
        <label htmlFor="tag" type="text" className="mt-5 text-xl">
          Team TAG
        </label>
        <input
          name="tag"
          type="text"
          placeholder="  Three caracters only"
          className="mt-3 rounded border border-violet-400 text-gray-800 focus:outline-none focus:ring-violet-600 focus:ring-1" 
        ></input>
        <label htmlFor="country" type="text" className="mt-5 text-xl">
          Team country TAG
        </label>
        <input
          name="country"
          type="text"
          placeholder="  Three caracters only"
          className="mt-3 rounded border border-violet-400 text-gray-800 focus:outline-none focus:ring-violet-600 focus:ring-1"
        ></input>
        <Button children={'CREATE'} size={'mt-10 w-40 h-12'} />
      </div>
    </div>
  );
}
