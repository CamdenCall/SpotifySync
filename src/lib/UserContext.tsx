import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from "next/router";

export interface Song {
  id: string;
  name: string;
  album: { name: string; images?: Array<{ url: string }> };
  artists: Array<{ name: string; id: string }>;
  duration_ms: number;
}

interface SongContextProps {
  songs: Song[];
  token: string | null;
  loading: boolean;
  addSong: (song: Song) => void;
  removeSong: (id: string) => void;
  clearSongs: () => void;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const SongContext = createContext<SongContextProps | undefined>(undefined);

export const SongContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState<Song[]>([]);
  const [token, setTokenState] = useState<string | null>(null);

  const addSong = (song: Song) => setSongs((prev) => [...prev, song]);

  const removeSong = (id: string) =>
    setSongs((prev) => prev.filter((song) => song.id !== id));

  const clearSongs = () => setSongs([]);

  const setToken = (newToken: string) => {
    setTokenState(newToken);
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', newToken);
    }
  };

  const clearToken = () => {
    setTokenState(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  };


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setTokenState(storedToken);
    }
    setLoading(false); // Indicate loading is complete
  }, []);

  return (
    <SongContext.Provider
      value={{ songs, token, addSong, removeSong, clearSongs, setToken, clearToken, loading }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const useSongContext = () => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error('useSongContext must be used within a SongContextProvider');
  }
  return context;
};