import React, {useEffect, useState} from 'react';
import Image from 'next/image'
import searchSpotify from '@/lib/searchSpotify';
import { useToken } from '@/lib/TokenContext';
import getRecommendations from "@/lib/getReccomendations";
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
}

interface SuggestProps {
    token: string;
    songs: Song[];
  }

  
  
export default function Suggest({ token, songs }: SuggestProps) {
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
                    <div className="remove">
                        <img width={7.5} src="/add.svg" alt="remove" />
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
};
