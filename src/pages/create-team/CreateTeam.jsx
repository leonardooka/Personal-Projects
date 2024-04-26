import React, { createRef } from "react";
import Header from "../../components/header/header";
import Button from "../../components/button/button";
import { Link } from "react-router-dom";
import { postDataToDatabase } from "../../database";

const nameRef = createRef();
const logoRef = createRef();
const tagRef = createRef();
const countryRef = createRef();

export default function CreateTeam() {
  function handleSubmit() {
    const sendingData = {
      name: nameRef.current.value,
      logo: logoRef.current.value,
      tag: tagRef.current.value,
      country_tag: countryRef.current.value,
    };

    postDataToDatabase(sendingData, "add-team", "POST");

    nameRef.current.value = "";
    logoRef.current.value = "";
    tagRef.current.value = "";
    countryRef.current.value = "";
    alert("team created!");
  }

  return (
    <div className="bg-bg3 bg-cover bg-center bg-no-repeat flex-col justify-center items-center content-center size-full">
      <Header
        children="Create Team"
        fontSize={"text-6xl"}
        className={"mb-10"}
      />
      <form
        method="POST"
        action="http://127.0.0.1:5001/add-team"
        onSubmit={handleSubmit}
        className="w-3/5 m-auto flex flex-col items-center content-center p-4 bg-gradient-to-br bg-white border-4 border-violet-500 rounded-xl bg-opacity-70 h-3/4"
      >
        <label htmlFor="name" className="text-4xl">
          Team name:
        </label>
        <input
          name="name"
          ref={nameRef}
          type="text"
          maxLength="30"
          required
          className="mt-3 w-2/4 h-8 rounded border border-violet-400 text-gray-800 focus:outline-none focus:ring-violet-600 focus:ring-1"
        />
        <label htmlFor="logo" type="text" className="mt-5 text-xl">
          Team Logo
        </label>
        <input
          name="logo"
          ref={logoRef}
          type="text"
          placeholder="  URL only"
          maxLength="350"
          className="mt-3 w-2/4 rounded border border-violet-400 text-gray-800 focus:outline-none focus:ring-violet-600 focus:ring-1"
        ></input>
        <label htmlFor="tag" type="text" className="mt-5 text-xl">
          Team TAG
        </label>
        <input
          name="tag"
          ref={tagRef}
          type="text"
          required
          placeholder="  3 caracters only"
          maxLength="3"
          minLength="3"
          className="mt-3 rounded border border-violet-400 text-gray-800 focus:outline-none focus:ring-violet-600 focus:ring-1"
        ></input>
        <label htmlFor="country" type="text" className="mt-5 text-xl">
          Team country TAG
        </label>
        <input
          name="country_tag"
          ref={countryRef}
          type="text"
          required
          placeholder="  3 caracters only"
          maxLength="3"
          minLength="3"
          className="mt-3 rounded border border-violet-400 text-gray-800 focus:outline-none focus:ring-violet-600 focus:ring-1"
        ></input>
        <Button type="button" children={"CREATE"} size={"mt-10 w-40 h-12"} />
      </form>
    </div>
  );
}
