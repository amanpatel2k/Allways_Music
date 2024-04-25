import React from "react";
// import "./Sidebar.css";
import SidebarOption from "../src/components/SidebarOption";

import {AiOutlineHome} from "react-icons/ai";
import {BsTwitter} from "react-icons/bs"
import {MdOutlineFeaturedPlayList} from "react-icons/md"
import {SiConvertio} from "react-icons/si"
import {CgProfile} from "react-icons/cg"

import Avatar from "react-avatar";


function Sidebar() {
  return (
    <div class="flex-1 w-1/5 pl-10 pr-8 border-white border-r-2 border-solid">
      <BsTwitter class="text-6xl ml-2 mb-8 p-2" />

      <SidebarOption Icon={AiOutlineHome} text="Dashboard" />
      <SidebarOption Icon={MdOutlineFeaturedPlayList} text="Playlists" />
      <SidebarOption Icon={SiConvertio} text="Convert" />
      <SidebarOption Icon={CgProfile} text="Profile" />

      <div className="flex items-center space-x-4 p-1 mt-40 hover:bg-gray-800 rounded-2xl transition duration-100 ease-out">
        <Avatar size={70} round={20} src='https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top' alt=""/>
        <div>
          <p class="font-bold text-xl leading-none">Aman Patel</p>
          <p class="text-sm italic leading-tight">@amanpatel2k</p>
        </div>
      </div>
      
    </div>
  );
}

export default Sidebar;