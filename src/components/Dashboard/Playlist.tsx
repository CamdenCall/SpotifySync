import React, {use, useEffect, useState} from 'react';
import Image from 'next/image'
import searchSpotify from '@/lib/searchSpotify';
import { useToken } from '@/lib/TokenContext';
import getRecommendations from "@/lib/getReccomendations"
import "./Playlist.scss"
import "@/styles/var.scss"
interface Token {
    token: string;
}
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
}

interface ReccomendSong {
    artists: Array<{ id: string }>;
}
  
  
export default function Playlist({token}:Token) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [reccomendSongs, setReccomendSongs] = useState<Song>();
    
  
  const formatData = (song: Song) => {
    const artists: string[] = [];
    const tracks: string[] = [];
  
    if (song.artists && Array.isArray(song.artists)) {
        song.artists.forEach((artist) => {
            if (artist.id && !artists.includes(artist.id)) {
            artists.push(artist.id);
        }
    });
    }

    if (song.id && !tracks.includes(song.id)) {
        tracks.push(song.id);
    }
  
    return { artists, tracks };
  };
  


  const Search = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value

    if(token !== null && searchTerm !== '') {
        const item: SpotifyItem = await searchSpotify(token, searchTerm);
        if (item && item.tracks && item.tracks.items) {
            const items = item.tracks.items;
            console.log(items)
            setSongs(items);
        } else {
            console.log("No tracks found");
        }
    } else {
        console.log("no token")
    }
  }


  const fetchReccomendations = async (updatedSongs: Song) => {
    const { artists, tracks } = formatData(updatedSongs);
    const recc = await getRecommendations({ token, artists, tracks });
    console.log(recc);
  };


  const addReccomend = (song: Song) => {
    fetchReccomendations(song); // Pass the updated state explicitly
  };
  

  return (
    <div className='playlist'>
        <div className="playlist-name">
            <p>Playlist Name</p>
        </div>
        <div className="songs">
            {songs.map((song, index) => (
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
                <div className="remove">
                    <img width={7.5} src="/remove.svg" alt="remove" />
                </div>
            </div>
            ))}
            </div>


    </div>
  )
};
