import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { database } from '../firebase';
import { useUserAuth } from '../context/AuthContext';
import styles from './PlaylistDetails.module.css';


function PlaylistDetails() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const { user } = useUserAuth();

  const fetchPlaylist = async () => {
    try {
      const playlistRef = query(
        collection(database, `/music_client`),
        where('uid', '==', user.uid), // Replace with user ID
        where("playlists", "array-contains", id)
      );
      const snapshot = await getDocs(playlistRef);
      if (snapshot.docs.length) {
        const playlistData = snapshot.docs[0].data().playlists.filter(
          (item) => item.id === id
        )[0];
        setPlaylist(playlistData);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSongs = async () => {
    try {
      const songsRef = query(
        collection(database, `/music_client/${user.uid}/playlists/${id}/Songs`) // Replace with user ID
      );
      const snapshot = await getDocs(songsRef);
      if (snapshot.docs.length) {
        setSongs(snapshot.docs.map(doc => doc.data()));
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPlaylist();
    fetchSongs();
  }, [id]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Playlist Details</h1>
      <p className={styles.playlistId}>Playlist ID: {id}</p>
      <p className={styles.playlistName}>{playlist?.ID}</p>
      <ul className={styles.songList}>
        {songs.map((song) => (
          <li key={song.title} className={styles.songItem}>
            <div className={styles.songImageContainer}>
              <img
                className={styles.songImage}
                src={song.image} // Example: 'https://i.scdn.co/image/ab67616d0000b27328a8a05c3a7ba952c7615ab9'
                alt={song.title}
              />
            </div>
            <div className={styles.songDetails}>
            <span className={styles.songTitle}>Title: {song.title}</span>
              <span className={styles.songArtist}>Artist: {song.artist}</span>
              <span className={styles.songAlbum}>Album: {song.album}</span>
            </div>
          </li>
        ))}
      </ul>
      <h1 className={styles.end}>End</h1>
    </div>
  );
}

export default PlaylistDetails;