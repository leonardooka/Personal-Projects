import { Link } from "react-router-dom";
import "./styles.css";
import React from "react";

export default function Header({children, fontName, fontSize, color, className}) {

  const contentClasses = `text-center ${fontSize || 'text-8xl'} ${fontName || 'red-rose-regular' || 'arial'} ${color || 'text-white'} ${className}`
  return (
    
    <div className="h-30 text-center font-bold flex justify-center content-center items-center m-auto">
      <Link to='/'><h1 className={contentClasses}>{children}</h1></Link>
    </div>
  );
}
