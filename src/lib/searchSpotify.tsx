import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface SpotifySearchResponse {
  albums?: object;
  artists?: object;
  tracks?: object;
  [key: string]: any;
}

export default async function searchSpotify(token: string, search: string): Promise<SpotifySearchResponse> {
  const authOptions: AxiosRequestConfig = {
    url: 'https://api.spotify.com/v1/search',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      q: search,
      type: "track",
      limit: 10
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
