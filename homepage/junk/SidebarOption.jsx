import React from "react";
// import "./SidebarOption.css";
import { IconContext } from "react-icons";

function SidebarOption({ active, text, Icon }) {
  return (
    <div class= "flex items-center cursor-pointer  hover:bg-gray-800 rounded-2xl transition duration-100 ease-out">
      <IconContext.Provider value={{className:"text-7xl p-5 text-white"}}>
        <Icon/>
      </IconContext.Provider>
      <h2 class="font-extrabold text-lg ml-2 mr-5 p-2">{text}</h2>
    </div>
  );
}

export default SidebarOption;