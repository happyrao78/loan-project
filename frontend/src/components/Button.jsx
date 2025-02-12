import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import {Link} from "react-router-dom"



const InteractiveButton = ({
  buttonText = "Click Me",
  hoverText = "Go",
  bgColor = "bg-white",
  textColor = "text-black",
  hoverBgColor = "hover:bg-black",
  hoverTextColor = "hover:text-white",
  icon = <IoIosArrowForward />,
  property ,
  to
}) => {
  return (
    <Link
      className={`group relative max-w-fit cursor-pointer overflow-hidden rounded-md border ${bgColor} px-8 py-2 text-center ${textColor} transition-all ease-in-out ${hoverBgColor} ${hoverTextColor} z-15 flex justify-center items-center font-body text-md ${property}`} to={to}
    >
      {/* Default Text */}
      <span className="inline-block translate-x-0 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {buttonText}
      </span>

      {/* Hover State */}
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 px-2">
        <span>{hoverText}</span>
        {icon}
      </div>

      {/* Background Animation */}
      <div className="absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-black transition-all duration-300 group-hover:scale-[2] group-hover:bg-white"></div>
    </Link>
  );
};

export default InteractiveButton;
