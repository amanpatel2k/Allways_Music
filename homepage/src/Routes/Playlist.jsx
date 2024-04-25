import {
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
	getDoc, // Add 'getDoc' here
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContextProvider, useUserAuth } from '../context/AuthContext';
import { database } from '../firebase';

const Playlist = () => {
	const { user } = useUserAuth();
	// const [name, setName] = useState('');
	const [playlists, setPlaylists] = useState([]);
	const [spotifyUrl, setSpotifyUrl] = useState('');

	// const [imageURLs, setImageURLs] = useState('');

	const fetchUserData = async () => {
		try {
			const userQuery = query(
				collection(database, '/music_client'),
				where('uid', '==', user.uid)
			);
			const userDocRef = collection(database, '/music_client');
			const userQuery1 = query(userDocRef, where('uid', '==', user.uid));
			const userDocSnapshot = await getDocs(userQuery1);
			// const userData1 = userDocSnapshot.docs[0].data();
			const userId = userDocSnapshot.docs[0].id;
			const playlistsQuery = query(
				collection(database, `/music_client/${user.uid}/playlists`)
			);
			// const userDoc = await getDocs(userQuery);
			const playlistsDocs = await getDocs(playlistsQuery);
			// const userData = userDoc.docs[0].data();
			const playlistsData = playlistsDocs.docs.map((doc) => {
				return { ...doc.data(), id: doc.id }; // Include the playlist ID in the data
			});
			// setName(userData.username);

			setPlaylists(playlistsData);
		} catch (err) {
			console.error(err);
		}
	};
	const fetchPlaylist = async (playlist) => { // Add the 'playlist' parameter
        try {
            const playlistRef = doc(database, `/music_client/${user.uid}/playlists/${playlist}`);
            const docSnapshot = await getDoc(playlistRef);
            const playlistData = docSnapshot.data();
            if (playlistData) {
                setSpotifyUrl(playlistData.link);
            } else {
                console.log('No playlist data available');
            }
        } catch (error) {
            console.error(error);
        }
    };
	useEffect(() => {
		fetchUserData();
		fetchPlaylist();
	}, [user]);

	const [selectedPlaylist, setSelectedPlaylist] = useState(null);
	const [playlistName, setPlaylistName] = useState('');
	// const [playlistID, setPlaylistID] = useState(null);

	const handleSongSelect = (playlistId, setPlaylistNameCallback) => {
		setSelectedPlaylist(playlistId);
		fetchPlaylist(playlistId);
		setPlaylistNameCallback();
	};
	const renderSongDetails = () => {
		if (selectedPlaylist) {
			return (
				<PlaylistDetails
					playlist={selectedPlaylist}
					playlistName={playlistName}
					spotifyUrl={spotifyUrl} // Add this prop
				/>
			);
		} else {
			return <p style={styles.noSongSelected}>No playlist selected</p>;
		}
	};
	
	// console.log(playlistName);
	return (
		<div style={styles.container}>
			<div
				style={styles.songList}
				className="flex flex-col w-56 justify-items-start text-2xl"
			>
				{playlists.map((playlist, index) => (
					<div
						key={index}
						onClick={() =>
							handleSongSelect(playlist.id, () => setPlaylistName(playlist.name))}>
						<div style={styles.songItem}>{playlist.name}</div>

						
					</div>
				))}
			</div>
			<div style={styles.detailsContainer}>{renderSongDetails()}</div>
		</div>
	);
};

const PlaylistDetails = ({ playlist, playlistName, spotifyUrl }) => { // Add 'spotifyUrl' here

	const { user } = useUserAuth();

	const formatTime = (milliseconds) => {
	  const seconds = Math.floor(milliseconds / 1000);
	  const minutes = Math.floor(seconds / 60);
	  const left_over = seconds % 60;
	  return `${minutes}:${left_over < 10 ? '0' : ''}${left_over}`;
	};
  
	const [songs, setSongs] = useState([]);
	const fetchSongs = async () => {
	  try {
		const songsRef = query(
		  collection(
			database,
			`/music_client/${user.uid}/playlists/${playlist}/Songs`
		  ) // Replace with user ID
		);
		const snapshot = await getDocs(songsRef);
		if (snapshot.docs.length) {
		  setSongs(snapshot.docs.map((doc) => doc.data()));
		} else {
		  console.log('No data available');
		}
	  } catch (error) {
		console.error(error);
	  }
	};
  
	useEffect(() => {
	  fetchSongs();
	}, [playlist]);
  
	return (
		
	  <div>
	  <Link to={`/playlist/${playlistName}`}>
		<button style={styles.button}>View2</button></Link>
		<a href= {spotifyUrl} target="_blank">
		<button style={styles.button}>Spotify</button></a>
		<button style={styles.button}>Apple Music</button>
		<div className="text-5xl font-bold mb-20">
		<p>Current Playlist: </p>
		  <p>{playlistName}</p>
		</div>
		<small>Created by :{playlist.name}</small>
		<p>test</p>
		<p>{playlist}</p>
		<div className="grid grid-cols-4 items-center pr-20 pt-5 pb-5 space-x-64 border-b border-white w-full ">
		  <p>Vibes</p>
		  <p>TITLE</p>
		  <p>ARTIST</p>
		  <p>DURATION</p>
		</div>
		{songs.map((song, index) => (
		  <div
			key={index}
			className="grid grid-cols-4 items-center pr-20 pt-5 pb-5 space-x-64 border-b border-white"
		  ><img
				src={song.image}
				alt={`${song.title} album art`}
				style={{ width: '15%', height: 'auto' }}
			  />
			<div>{song.title}</div>
			<div>{song.artist}</div>
			<div className="pl-5">{formatTime(song.duration_ms)}</div>
			<div className="pl-5">
			</div>
		  </div>
		))}
	  </div>
	);
  };
  

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'row',
		height: '100vh',
		fontFamily: 'Arial, sans-serif',
		fontSize: '16px',
		color: 'white',
	},
	songList: {
		// flex: 1,
		padding: '32px',
		backgroundColor: '#787878',
		overflowY: 'auto',
	},
	songItem: {
		cursor: 'pointer',
		padding: '8px',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		textAlign:'auto' ,
	  },

	songTitle: {
		margin: 0,
		fontWeight: 'bold',
	},
	songArtist: {
		margin: 0,
	},
	noSongSelected: {
		textAlign: 'center',
		margin: 'auto',
	},
	detailsContainer: {
		flex: 2,
		padding: '100px',
		// backgroundColor: '#fff',
		display: 'flex',
		flexDirection: 'column',
		// justifyContent: 'center',
		// alignItems: 'center',
	},
	imageContainer: {
		width: '50%',
		marginBottom: '16px',
	},
	albumArt: {
		width: '100%',
		height: 'auto',
	},
	songDetails: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		color: 'white',
	},
	songAlbum: {
		margin: 0,
		fontSize: '14px',
		fontStyle: 'italic',
	},
	songDuration: {
		margin: 0,
		fontWeight: 'bold',
	},
	button: {
		border: '1px solid black',
		padding: '8px',
		margin: '8px',
		borderRadius: '4px',
		color:'white',
		backgroundColor: 'rgba(128, 128, 128, 0.3)',
		opacity: 0.9,
		cursor: 'pointer',
	  },
};

export default Playlist;
