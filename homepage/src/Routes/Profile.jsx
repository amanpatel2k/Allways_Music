/*
  => This page is the profile page where the user can update their profile image, reset password, or update username
*/
import { useEffect, useState } from "react";
import { useUserAuth } from "../context/AuthContext";
import { collection, query, where, getDocs, doc, updateDoc} from "firebase/firestore";
import { database} from "../firebase";
import { Link} from "react-router-dom";
import { sendPasswordResetEmail, getAuth} from "firebase/auth";
// Import the CSS file at the top of your component file
import './ProfileStyles.css';


function Profile() {

  /* 
    => Grab the current user from firebase authentication
    => Create useState for storing username, firstname, lastname, profile image, unique id, email, and playlist
  */
  const { user } = useUserAuth();
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [img, setImg] = useState("");
  const [uid, setUID] = useState("");
  const [email, setemail] = useState("");
  const [playlists, setPlaylists] = useState([]);

  /* 
    => Store the new image profile URL and the new username 
    => Grab the authentication from firebase 
  */
  const [imageURLs, setImageURLs] = useState("");

  const [newname, setNewname] = useState("");
  const auth = getAuth();

  /* 
    => The fetchUserData is to update the UseState with the information from the database such as: 
      => Setting username, first & last name, profile image, unique id, and user's emai.
  */
  const fetchUserData = async () => {
    try {

      // Query the database based on the user's unique ID
      const userQuery = query(
        collection(database, "/music_client"),
        where("uid", "==", user.uid)
      );

      // Grab different snapshots and data based on the user's unique ID
      const userDocRef = collection(database, "/music_client");
      const userQuery1 = query(userDocRef, where("uid", "==", user.uid));
      const userDocSnapshot = await getDocs(userQuery1);
      const userData1 = userDocSnapshot.docs[0].data();
      const userId = userDocSnapshot.docs[0].id;
      console.log("MATTTTTTT");
      console.log(userData1);
      const playlistsQuery = query(
        collection(database, `/music_client/${userId}/playlists`)
      );
      // Retrieve information from the single current document
      const userDoc = await getDocs(userQuery);
      const playlistsDocs = await getDocs(playlistsQuery);
      // Grab and store the data from the document into a variable
      const userData = userDoc.docs[0].data();
      const playlistsData = playlistsDocs.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }; // Include the playlist ID in the data
      });

      // Update each useState with the correct information 
      setName(userData.username);
      setImg(userData.image);
      setUID(userData.uid);
      setemail(userData.email);
      setFirstname(userData.firstname);
      setLastname(userData.lastname);
      setPlaylists(playlistsData);
    } catch (err) {
      console.error(err);
    }
  };

  // Update the data for the given user
  useEffect(() => {
    fetchUserData();
  }, [user]);

  // The function handle the ability when a user can update their username 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try { 
      // If the username is not empty  
      if (newname !== ''){
        // Query the database based on the user unique ID and use the updateDoc function to update the username
        const updateUsername = doc(database, 'music_client', user.uid);
        await updateDoc(updateUsername, {
        username: newname
        });
        // Refresh the page 
        window.location.reload(false);
      }
    } catch (e) {
      console.log(e)
    }
  };

  // This function handles the ability to reset the user's password
  const handleResetPassword = async (e) => {
    e.preventDefault()
    try { 
      // Utilizes the sendPasswordResetEmail function to send the reset password message to the email 
      const val = sendPasswordResetEmail(auth, email)
      .then((val) => {
        console.log(val)
      })
      // Display an alert saying that the message has been sent
      alert('Sent password reset to: ' + email)
    } catch (error){ 
      alert(error.message)
    }
  }

  // The function handle the ability when a user can update their user profile 
  const handleImageURL = async (e) => {
    e.preventDefault()
    try { 
      // If the imageURL is not empty
      if (imageURLs !== ''){
        // Query the database based on the user unique ID and use the updateDoc function to update the image URL
        const updateUsername = doc(database, 'music_client', user.uid);
        await updateDoc(updateUsername, {
        image: imageURLs
        });
        // Refresh the page 
        window.location.reload(false);
      }
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <img style={styles.albumArt} src={img} alt="User's album art" />
        <div class="flex items-center border-b border-blue-500 py-2">
          <input onChange={(e) => setImageURLs(e.target.value)} class="appearance-none bg-transparent border-none w-full text-white-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="link"/>
          <button onClick={handleImageURL} class="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded">
            Update URL Profile
          </button>
        </div>
      </div>
      <div style={styles.detailsContainer}>
        {/* <h2 style={styles.title}>{name}</h2> */}
        <div class="flex items-center border-b border-blue-500 py-2">
          <input onChange={(e) => setNewname(e.target.value)} class="appearance-none bg-transparent border-none w-full text-white-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder={name}/>
          <button onClick={handleSubmit} class="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded">
            Update
          </button>
        </div>
        <h2 style={styles.title}>{firstname + ' ' + lastname}</h2>
        <p style={styles.artist}>{email}</p>
        <p style={styles.duration}>UID: {uid}</p>
        <button onClick={handleResetPassword} class="mt-3 m-auto flex items-center flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded">
            Reset Password
          </button>
      </div>
      <div className="playlist-grid">
      <h2 style={styles.playlistTitle}>Playlists</h2>
<hr style={{border: '1px solid black', marginTop: '5px', marginBottom: '10px'}} />
{playlists.map((playlist, index) => (
  <div key={index} className="playlist-container">
    <Link to={`/playlist/${playlist.id}`}>
      <h3 style={styles.playlistName}>{playlist.name}</h3>
      <p style={styles.playlistCreatedBy}>
        Created By: {playlist.createdBy}
      </p>
    </Link>
  </div>
))}

</div>

    </div>
  );
}

function PlaylistPage({ match }) {
  const { user } = useUserAuth();

  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      const { id } = match.params;
      const playlistRef = collection(
        database,
        `/music_client/${user.uid}/playlists`
      );
      const playlistDoc = await getDocs(
        query(playlistRef, where("id", "==", id))
      );
      setPlaylist(playlistDoc.docs[0].data());
    };

    fetchPlaylist();
  }, [match.params, user]);

  if (!playlist) {
    return <p>Loading...</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.playlistContainer}>
        <h2 style={styles.title}>{playlist.Name}</h2>
        <p style={styles.createdBy}>Created By1: {playlist.createdBy}</p>
        <div className="grid-container">
          {playlist.songs.map((song, index) => (
            <div key={index} style={styles.songContainer}>
              <h3 style={styles.songName}>{song.title}</h3>
              <p style={styles.songArtist}>{song.artist}</p>
              <p style={styles.songDuration}>{song.duration}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
          }  

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
  },
imageContainer: {
marginTop: "3rem",
},
albumArt: {
width: "15rem",
height: "15rem",
borderRadius: "50%",
cursor: "pointer"
},

detailsContainer: {
  marginTop: "2rem",
  marginBottom: "2rem",
  wordWrap: "break-word",
  overflowWrap: "break-word",
},
title: {
fontSize: "2.5rem",
fontWeight: "bold",
},
artist: {
fontSize: "1.5rem",
},
duration: {
fontSize: "1.2rem",
color: "gray",
marginTop: "1rem",
},
playlistTitle: {
fontSize: "2rem",
fontWeight: "bold",
marginBottom: "2rem",
},
playlistContainer: {
  width: "50%", // Adjust this value for items per row
  padding: "1rem",
  border: "1px solid gray",
  borderRadius: "0.5rem",
  marginBottom: "1rem",
  wordWrap: "break-word",
  overflowWrap: "break-word",
},
playlistName: {
fontSize: "1.5rem",
fontWeight: "bold",
marginBottom: "0.5rem",
},
playlistCreatedBy: {
fontSize: "1rem",
color: "gray",
},
gridContainer: {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)", // Set a fixed number of columns
  gridGap: "1rem",
},

songContainer: {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "1rem",
  wordWrap: "break-word",
  overflowWrap: "break-word",
  padding: "1rem",
  border: "1px solid gray",
  borderRadius: "0.5rem",
},
songName: {
fontSize: "1.2rem",
fontWeight: "bold",
},
songArtist: {
fontSize: "1rem",
color: "gray",
},
songDuration: {
fontSize: "1rem",
color: "gray",
},
songGridContainer: {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
},

};

export { Profile, PlaylistPage };
