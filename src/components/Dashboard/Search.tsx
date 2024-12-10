import React, { useState } from 'react';
import Image from 'next/image';
import searchSpotify from '@/lib/searchSpotify';
import getRecommendations from '@/lib/getReccomendations';
import { useSongContext } from '@/lib/UserContext';
import './Search.scss';
import Suggest from './Suggest';

interface SpotifyItem {
  tracks?: {
    items?: Array<Song>;
  };
}

interface Song {
  id: string;
  name: string;
  album: { name: string; images?: Array<{ url: string }> };
  artists: Array<{ name: string; id: string }>;
  duration_ms: number;
}


export default function Search() {
  const [songs, setSongs] = useState<Song[]>([]);
  const { token } = useSongContext();
  const [reccomendSongs, setReccomendSongs] = useState<Song[]>([]);


  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.trim();
    if (token?.trim() && searchTerm) {
      const item: SpotifyItem = await searchSpotify(token, searchTerm);
      if (item?.tracks?.items) {
        setSongs(item.tracks.items);
        console.log(item.tracks.items)
      } else {
        console.log('No tracks found');
      }
    } else {
      console.log('No valid token or search term');
    }
  };

  const fetchRecommendations = async (song: Song) => {
    const allRecommendations = await getRecommendations({token, song})
    const flattenedTracks = allRecommendations.flatMap((response) => response.tracks?.items || []);
    if (flattenedTracks.length > 0) {
        setReccomendSongs(flattenedTracks);
      } else {
        console.log('No tracks found');
      }
  };

  return (
    <div className='left'>
        <div className="search-contianer">
            <div className="search">
                <Image src="/search.svg" alt="search icon" width={15} height={16} />
                <input type="text" placeholder="Search for a song or artist" onChange={handleSearch} />
            </div>
            <div className="search-list">
                <div className="song-info">
                <p>Title</p>
                <p className="album-name">Album</p>
                <Image src="/clock.svg" alt="clock icon" width={12.5} height={12.5} className="time" />
                </div>
                <div className="songs">
                {songs.length === 0 ? (
                    <div className='error-container'>
                        <p className='error'>No songs found. Try searching for something else</p>
                    </div>
                    
                ) : (
                    songs.map((song, index) => (
                    <div key={song.id || index} className="song" onClick={() => fetchRecommendations(song)}>
                        <div className="left">
                        <div className="song-title">
                            <img
                            className="preview"
                            height={50}
                            src={song.album.images?.[0]?.url || '/vercel.svg'}
                            alt={song.name || 'No Title'}
                            />
                            <div className="song-author">
                            <p>{song.name || 'Unknown Song'}</p>
                            <p>{song.artists?.[0]?.name || 'Unknown Artist'}</p>
                            </div>
                        </div>
                        </div>
                        <p className="album-name">{song.album.name || 'Unknown Album'}</p>
                        <p className="time">
                        {Math.floor(song.duration_ms / 60000)}:
                        {Math.floor((song.duration_ms % 60000) / 1000).toString().padStart(2, '0')}
                        </p>
                    </div>
                    ))
                )}
                </div>
            </div>
        </div>
        <Suggest songs={reccomendSongs}/>
    </div>
    
  );
}
