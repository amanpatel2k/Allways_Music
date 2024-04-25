/*
  => This the homepage that the user will be directed to once the successfully logins in or creating an account
  => This page will display the a welcome message with the username and other information
*/
import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/AuthContext";
import { collection, query, where, getDocs} from "firebase/firestore";
import { database } from "../firebase";

import {SiApplemusic} from "react-icons/si";
import {BsSpotify} from "react-icons/bs";

const Dashboard = () => {
  
  // Get the current user and created a name state to store the user's username
  const {user} = useUserAuth();
  const [name, setName] = useState("");

  /* 
    => FetchUserName is a function that is used to grab the current user's username from the database
    => The function will query the database to find the user based on the current user's uid
        => Once found, the username will be stored in a variable which will be used later on
  */
  const fetchUserName = async () => {
    try {
      console.log(user)
      const q = query(collection(database, "music_client"), where("uid", "==", user.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.username);
    } catch (err) {
      console.error(err);
    }
  };

  /* 
    => Used to run the fetchUserName and return the current user 
  */  
  useEffect(() => {
    fetchUserName();
  }, [user]);

  return (
    <>
      <div>
        <div className="px-10 md:px-20 lg:px-40 dark:bg-gray">
          <section className= "h-screen opacity-100 shadow-lg p-10 rounded-xl">
            <div className="text-center p-10">
              <h2 className = "text-5xl py-2 text-blue-500 font-medium md:text-6xl">
                WELCOME, {name}
              </h2>
              <h3 className="text-2xl py-2 md:text-3xl">
                All Music Works On The Platform
              </h3>
              <p className="text-lg py-5 leading-8 text-white-900 md:text-xl max-w-lg mx-auto">
                Welcome to the hassle-free tool to convert your playlists between your favorite music services.
              </p>
              <div className="text-8xl flex justify-center gap-16">
              <SiApplemusic color="rgb(252, 60, 68)" />
                <BsSpotify color='green' />
              </div>
              <h1 className="text-xl p-10 font-twitter">Developed by Aman, Kyle, Matthew, and Siddharth</h1>
            </div>
            <div className="relative mx-auto w-80 h-80 mt-20 md:h-96 md:w-96">
              {/* <Image src={csuf}/> */}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;