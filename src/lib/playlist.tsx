import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import getUserId from "./getUserId";

interface SpotifySearchResponse {
  albums?: object;
  artists?: object;
  tracks?: object;
  [key: string]: any;
}

interface SpotifyPlaylistResponse {
  albums?: object;
  artists?: object;
  tracks?: object;
  [key: string]: any;
}

interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}

interface SpotifyResponse {
  items: Playlist[];
}



export async function createPlaylist(token: string | null): Promise<SpotifySearchResponse> {
  const userId = await getUserId(token)
  const authOptions: AxiosRequestConfig = {
    url: `https://api.spotify.com/v1/users/${userId}/playlists`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      name: "SpotifySync"
    }
  };

  try {
    const response: AxiosResponse<SpotifySearchResponse> = await Axios(authOptions);
    return response.data;
  } catch (error) {
    console.error("Error in Spotify search:", error);
    throw error;
  }
}

export async function getPlaylists(token: string | null): Promise<Playlist[]> {
  const userId = await getUserId(token)
  const authOptions: AxiosRequestConfig = {
    url: `https://api.spotify.com/v1/users/${userId}/playlists`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      name: "SpotifySync"
    }
  };
  try {
    const response: AxiosResponse<SpotifyResponse> = await Axios(authOptions);
    console.log(response.data)
    return response.data.items;
  } catch (error) {
    console.error("Error in Spotify search:", error);
    throw error;
  }
}

export async function addSong(token: string | null, songUri: string | null): Promise<Playlist[]> {
  const userId = await getUserId(token)
  const getPlaylistId = async () => {
    const playlists = await getPlaylists(token)
    const playlist = playlists.find(playlist  => playlist.name === "SpotifySync")
    if (playlist == undefined) {
      return "Create playlist first"
    } else {
      return playlist.id
    }
  }
  const playlistId = await getPlaylistId()
  const authOptions: AxiosRequestConfig = {
    url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      uris: [songUri]
    }
    
  };
  try {
    const response: AxiosResponse = await Axios(authOptions);
    return response.data;
  } catch (error) {
    console.error("Error in Spotify search:", error);
    throw error;
  }
  
}

export async function removeSong(token: string | null, songUri: string | null): Promise<Playlist[]> {
  const userId = await getUserId(token)
  const getPlaylistId = async () => {
    const playlists = await getPlaylists(token)
    const playlist = playlists.find(playlist  => playlist.name === "SpotifySync")
    if (playlist == undefined) {
      return "Create playlist first"
    } else {
      return playlist.id
    }
  }
  const playlistId = await getPlaylistId()
  const authOptions: AxiosRequestConfig = {
    url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      tracks: [{uri: songUri}]
    }
    
  };
  try {
    const response: AxiosResponse = await Axios(authOptions);
    return response.data;
  } catch (error) {
    console.error("Error in Spotify search:", error);
    throw error;
  }
  
}
