import React, {use, useEffect, useState} from 'react';
import { createPlaylist, removeSong } from '@/lib/playlist';
import { useSongContext } from '@/lib/UserContext';
import "./Playlist.scss"
import "@/styles/var.scss"
interface SpotifyItem {
    tracks?: {
      items?: Array<{
        id: string
        name: string;
        album: { name: string };
        artists: Array<{ name: string, id: string }>;
        duration_ms: number;
      }>;
    };
}
interface Song {
    id: string
    name: string;
    album: { name: string; images?: Array<{ url: string}> };
    artists: Array<{ name: string, id: string }>;
    duration_ms: number;
    uri: string;
}

  
  
export default function Playlist() {
  const { playlistSongs, token, removePlaylistSong } = useSongContext();
    
  
  const createPlaylistButton = async () => {
    await createPlaylist(token)
  }

  const removeSongButton = async (song: Song) => {
    try {
        // Pass the `songUri` to your `addSong` function
        removePlaylistSong(song.id)
        await removeSong(token, song.uri);
    } catch (error) {
        console.error("Failed to add song:", error);
    }
    }

  


  

  return (
    <div className='playlist'>
        <div className="playlist-name">
            <p>Playlist Name</p>
            <div className="remove" onClick={createPlaylistButton}>
                <img width={7.5} src="/add.svg" alt="remove" />
            </div>
        </div>
        <div className="songs">
            {playlistSongs.map((song, index) => (
                <div key={index} className="song">
                <div className="left">
                    <div className="song-title">
                    <img className="preview" height={50} src={song.album.images?.[0]?.url || '/vercel.svg'} alt={song.name} />
                    <div className="song-author">
                        <p>{song.name}</p>
                        <p>{song.artists[0].name}</p>
                    </div>
                    </div>
                </div>
                <div className="remove" onClick={() => removeSongButton(song)}>
                    <img width={7.5} src="/remove.svg" alt="remove" />
                </div>
            </div>
            ))}
            </div>


    </div>
  )
};
