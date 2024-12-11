import React, {useEffect, useState} from 'react';
import Image from 'next/image'
import searchSpotify from '@/lib/searchSpotify';
import { useSongContext } from '@/lib/UserContext';
import getRecommendations from "@/lib/getReccomendations";
import { addSong } from '@/lib/playlist';
import "./Search.scss";
import "@/styles/var.scss";
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
    uri: string
}

interface SuggestProps {
    songs: Song[];
  }


export default function Suggest({songs }: SuggestProps) {
    const { token, addPlaylistSong } = useSongContext();
    const addSongButton = async (song: Song) => {
        try {
            // Pass the `songUri` to your `addSong` function
            addPlaylistSong(song)
            await addSong(token, song.uri);
        } catch (error) {
            console.error("Failed to add song:", error);
        }
    }
    console.log(songs)
      
    return (
        <div className="search-contianer">
            <div className='search-list'>
                <div className='suggested-songs'>
                    <p>Suggested Songs</p>
                    <p>Add All</p>
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
                    <p className="album-name">{song.album.name}</p>
                    <div className="remove" onClick={() => addSongButton(song)}>
                        <img width={7.5} src="/add.svg" alt="remove" />
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
};
