/*
  => Generate a convert page where the user enters a public URL playlist and selects a platform in which the public playlist resides in
  => Once the user click on the convert page, the application will create a generic playlist where the user can view it
*/
//https://music.apple.com/us/playlist/90s-rock-essentials/pl.94aeee85f6bd48058d1a53873db1e66d
//https://music.apple.com/us/playlist/80s-rock-essentials/pl.c684d47c46924bcdbc4a065dd370a8d5
//https://music.apple.com/us/playlist/2000s-hard-rock-essentials/pl.233b74e72d5d49e68735871d199ed821
import React, {useState} from 'react'
import {useForm} from "react-hook-form"
// import '../convert.css';
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { database } from "../firebase";
import { SiThespritersresource } from 'react-icons/si';
import { useUserAuth } from '../context/AuthContext';


function Convert() {
  
  // Define use States for storing the public URL playlist and the selected music platform
  const [url, setURL] = useState('')
  const [platform, setPlatform] = useState('')
  const [error, setError] = useState('')
  const { user } = useUserAuth();
  //make for loop here 
  //to call this     getPlaylistDataAndAddSongs('iWwfCvSxuTOZ67YvaFWnB4ovMVm1',url)//PUT USER ID HERE
  //but with SiThespritersresource346ftqjgTwy7MEsl3oHUlk
  //3qxUCF85A3192aGU6qxgfE
  //28yAL2GbBhRmMe7UFQObF7
  //7EnyqmmhFgfhicejZiVV13
  //5XApQU701SUEscZPcVblHN
  //STOP
  // const urls = [
  //   "SiThespritersresource346ftqjgTwy7MEsl3oHUlk",
  //   "3qxUCF85A3192aGU6qxgfE",
  //   "28yAL2GbBhRmMe7UFQObF7",
  //   "7EnyqmmhFgfhicejZiVV13",
  //   "5XApQU701SUEscZPcVblHN",
  //   "3G5oP7ZP4gumjS25qL8KEY",
  //   "2xsIoqzZXdHDvnrot6Z8ql",
  //   "3ybZkcoA09pYekp0DIo1OP",
  //   "37i9dQZF1DXcBWIGoYBM5M",
  //   "37i9dQZF1DX0XUsuxWHRQd",
  //   "37i9dQZF1DXbYM3nMM0oPk",
  //   "1Z7fO3bkVteGsTbVluOQoH",
  //   "37i9dQZF1DX1kCIzMYtzum",
  //   "37i9dQZF1EQmPV0vrce2QZ",
  //   "37i9dQZF1DWUa8ZRTfalHk",
  //   "3ftsUXH0rTUXh350q9gasl",
  //   "5EDgZp2NmTbnp8yrEfoASh",
  //   "0uwqioeN6C1NuXwjNVtY5f",
  //   'https://open.spotify.com/playlist/37i9dQZF1DX9sIqqvKsjG8',
  //   'https://open.spotify.com/playlist/37i9dQZF1DWZZbwlv3Vmtr',
  //   'https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ',
  //   'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO',
  // ];

  const handleConvert = async () => {
    var i = 0;
    try {
      // Iterate over the URLs and fetch playlists
      // for (const url of urls) {
      //   const playlistData = await getPlaylistDataAndAddSongs(user.uid, url);
      //   // Add the fetched playlist to the database
      //   setTimeout(addPlaylist(user.uid, playlistData), 10000);
      //   console.log(i);
      //   i++;
      // }
        const playlistData = await getPlaylistDataAndAddSongs(user.uid, url);
        // Add the fetched playlist to the database
        setTimeout(addPlaylist(user.uid, playlistData), 10000);
        // console.log(i);

    } catch (error) {
      setError(error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleConvert();
    //const playlistData = await getPlaylistDataAndAddSongs('iWwfCvSxuTOZ67YvaFWnB4ovMVm1',url)//PUT USER ID HERE
  //addPlaylist('iWwfCvSxuTOZ67YvaFWnB4ovMVm1', playlistData);
    setError('')
    try { 
      // alert(url + ' ' + platform)
      alert("Done Converting")
    } catch (e) {
      setError(e.message)
    }
  };
  
  const addSong = async (USER,playlistId,songData) => {
    try {
      const playlistRef = collection(database, `/music_client/${USER}/playlists/${playlistId}/Songs`);
      const newSong = songData;
      const docRef = await setDoc(doc(playlistRef, songData.title), newSong);
      console.log("Document written with ID: ", docRef);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };  

  const addPlaylist = async (USER, playlistData) => {
    console.log('trying1');
    try {
      const currentDate = new Date().toLocaleDateString();
      const playlistRef = collection(database, `/music_client/${USER}/playlists`);
      const newPlaylist = {
        id: playlistData.name,
        name: playlistData.name,
        createdBy: "GET USERNAME",
        dateCreated: currentDate,
        link: playlistData.external_urls.spotify// is this right
      };
      await setDoc(doc(playlistRef, newPlaylist.id), newPlaylist);
      console.log("Playlist created with ID: ", newPlaylist.id);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };
  
  
const getPlaylistDataAndAddSongs = async (USER, playlistId) => {
  try {
    const urlParts = playlistId.split('/');
    const split = urlParts[urlParts.length - 1];
    const clientId = 'ee00c232eecb4108b0d3738f8c758b3a'; // replace with your Spotify client ID
    const clientSecret = '6046c8d0d7f844d7a5cb6b17c592cbd1'; // replace with your Spotify client secret

    // Encode your Spotify client ID and client secret as Base64
    const basicAuth = btoa(`${clientId}:${clientSecret}`);

    // Make a POST request to the Spotify Accounts service to get an access token
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    const accessToken = data.access_token;

    // Make a request to the Spotify API to get the playlist data
    const playlistResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const playlistData = await playlistResponse.json();
    console.log("HERE");
    console.log(playlistData);
    const playlist_name = playlistData.name;
    playlistId = playlist_name;
    try {
      const currentDate = new Date().toLocaleDateString();
      const playlistRef = collection(database, `/music_client/${USER}/playlists`);
      const newPlaylist = {
        id: playlistData.name,
        name: playlistData.name,
        createdBy: playlistData.owner.display_name,//get crated by with spotify api,
        dateCreated: currentDate,
        link: playlistData.external_urls.spotify// is this right,
      };
      await setDoc(doc(playlistRef, newPlaylist.id), newPlaylist);
      console.log("Playlist created with ID: ", newPlaylist.id);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
    const tracks = playlistData.tracks.items;
    const songData = tracks.map(track => {
      return {
        id: track.track.id,
        title: track.track.name,
        artist: track.track.artists[0].name,
        album: track.track.album.name,
        duration_ms: track.track.duration_ms,
        image: track.track.album.images[0].url,
        link: track.track.external_urls.spotify
      }
    });

    // Call the addSong function for each song in the playlist
    songData.forEach(song => {
      addSong(USER, playlistId, song);
    });
  } catch (err) {
    console.error(err);
  }
};
// /music_client/xaXUty06DJM0IHfXu20w/playlists/T2nVh2xojB0ynLjVdzU2/Songs
  return (
    <>
      <div>
        <div className="px-10 md:px-20 lg:px-40 dark:bg-black">
          <div className= "h-screen opacity-100 shadow-lg p-10 rounded-xl text-center"> 
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col py-2'>
              <label className='text-3xl py-2 text-left font-medium'>Enter Public Playlist URL ID </label>
              <input onChange={(e) => setURL(e.target.value)} className='border p-3' type="text"></input>
            </div>

            <div className='flex flex-col py-2 pt-3'>
              <label className='text-3xl py- text-left font-medium'>Select Platform 
                <div className='pt-4'>
                <ul class="w-45 font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div class="flex items-center pl-3">
                            <input type="radio" name="platform" value="Spotify" id="spotify-platform" checked={platform==='Spotify'} onChange={(e) => setPlatform(e.target.value)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                            <label for="spotify-platform" class="w-full py-3 ml-2 text-xl font-medium text-gray-900 dark:text-gray-300">Spotify </label>
                        </div>
                    </li>
                    <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div class="flex items-center pl-3">
                            <input id="apple-music-platform" type="radio" value="Apple Music" checked={platform === 'Apple Music'} onChange={(e) => setPlatform(e.target.value)} name="platform" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                            <label for="apple-music-platform" class="w-full py-3 ml-2 text-xl font-medium text-gray-900 dark:text-gray-300">Apple Music</label>
                        </div>
                    </li>
                </ul>

                </div>
              </label>
            </div>    
            <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>Convert</button>
          </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Convert
