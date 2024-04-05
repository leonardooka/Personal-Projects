import React from "react";
import Header from "../../components/header/header";
import Button from "../../components/button/button";
import './styles.css'

export default function League() {
  return (
    <div className="league-background bg-center bg-cover bg-no-repeat flex-col size-full justify-center item-center content-center">
      <Header
        children="League Name"
        fontSize={"text-6xl"}
        className={"mb-10"}
      />
      <div className="w-4/5 h-4/5 m-auto border-2 flex flex-row border-blue-300">
        <div className="w-1/5 h-full border-2 border-red-500 p-3 space-y-5">
          <Button children={'TABLE'} size={'h-16 w-8/9'}/>
          <Button children={'GOALS'} size={'h-16 w-8/9'}/>
          <Button children={'ASSISTS'} size={'h-16 w-8/9'}/>
          <Button children={'MATCHES'} size={'h-16 w-8/9'}/>

        </div>

        <div className="w-5/6 h-full m-auto flex flex-col items-center content-center p-4 bg-gradient-to-br bg-white border-4 border-violet-500 rounded-xl bg-opacity-70">
        </div>
      </div>
    </div>
  );
}
