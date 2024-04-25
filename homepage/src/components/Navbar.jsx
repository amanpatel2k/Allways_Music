/* 
Generate the Navbar for the webpage
*/


import React, {useState, useEffect} from "react"
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import {Link} from "react-router-dom"
import {SidebarData} from "./SidebarData"
import "../Nav.css"
import { IconContext } from "react-icons"
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { database } from "../firebase";


import Avatar from "react-avatar";

function Navbar() {
    
    /* 
    => Initalize useState when opening/closing the sidebar 
    => The sidebar is automatically initialize to close when a user logins 
    */
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    /* 
    => Grab the current user information from firebase authentication 
    => Establish UseStates to store username, first & last name, and profile image
    => Also, initialize a variable for navigating to different pages 
    */
    const {user, logout} = useUserAuth();
    const [name, setName] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    /* 
    => fetchUserName is initialize to fetch the current user that is login 
    => We query the firebase database, Cloud Firestone
    => When querying we update:
        => Usernmae, User Profile, First Name, & Last Name variables
    => If an issue arise, an error message will be displayed
    */
    const fetchUserName = async () => {
      try {
        const q = query(collection(database, "music_client"), where("uid", "==", user.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.username);
        setImage(data.image);
        setFirstName(data.firstname)
        setLastName(data.lastname)
      } catch (err) {
        console.error(err);
      }
    };
    
    /*
    UseEffect will be use to run the fetchUserName and return the current user 
    */
    useEffect(() => {
      fetchUserName();
    }, [user]);

    /*
    => Handles the case when a user logouts of their account 
    => The user will be redirected back to the Sign In page.
    */
    const handleLogout = async () => {
      try {
        await logout();
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    };

    return (
        <>
        <IconContext.Provider value={{color: "undefined"}}>
            <div className="navbar">
                <Link to="#" className="menu-bars">
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
                <h1 className="pl-40 text-3xl py-2 font-mono text-blue-500 font-medium md:text-xl">ALLWAYS MUSIC</h1>
                <Link to="#" className="menu-bars">
                    {/* <AiIcons.AiOutlineLogout onClick={handleLogout} /> */}
                    <div onClick={handleLogout} className="flex items-center space-x-4 p-1 hover:bg-gray-300 rounded-2xl transition duration-100 ease-out">
                        <Avatar size={70} round={20} src={image} alt=""/>
                        <div>
                        <p className="font-bold text-xl leading-none">{firstname + ' ' + lastname}</p>
                        <p className="text-sm italic leading-tight">@{name}</p>
                        </div>
                    </div>
                </Link>
            </div>
            <nav className={sidebar ? "nav-menu active": "nav-menu"}style={{backgroundColor: 'grey',  border: '1px solid white'}}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle"style={{backgroundColor: 'gray',}}>
                        <Link to="#" className="menu-bars-2">
                            <AiIcons.AiOutlineClose/>
                        </Link>
                    </li>
                    {SidebarData.map((item,index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </IconContext.Provider>
        </>
    )
}

export default Navbar