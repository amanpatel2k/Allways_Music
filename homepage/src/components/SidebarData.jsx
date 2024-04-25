/* 
Generate the sidebar and the logos for each siderbar component
*/
import React from "react";

import {AiOutlineHome} from "react-icons/ai";
import {MdOutlineFeaturedPlayList} from "react-icons/md"
import {SiConvertio} from "react-icons/si"
import {CgProfile} from "react-icons/cg"

/* 
  => Export a list of application Icons
  => Each application Icon represents a page that the user can navigate to
  => For each application Icon:
    => We specify the actual icon name, the title name, and the path to that page
*/

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiOutlineHome/>,
    cName: "nav-text",
  },
  {
    title: "Playlist",
    path: "/playlist",
    icon: <MdOutlineFeaturedPlayList/>,
    cName: "nav-text",
  },
  {
    title: "Convert",
    path: "/convert",
    icon: <SiConvertio/>,
    cName: "nav-text",
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <CgProfile/>,
    cName: "nav-text",
  },
];