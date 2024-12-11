import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface SpotifySearchResponse {
  tracks?: {
    items?: Array<any>;
  };
  [key: string]: any;
}

interface Song {
  id: string;
  name: string;
  album: { name: string; images?: Array<{ url: string }> };
  artists: Array<{ name: string; id: string }>;
  duration_ms: number;
}

interface SpotifyRecommendationsProps {
  token: string | null;
  song: {
    name: string;
    artists: Array<{ name: string; id: string }>;
  };
}

async function getArtistGenres(artistId: string, token: string | null) {
  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const artistData = await response.json();
  return artistData.genres;
}

const getRecommendations = async ({ token, song }: SpotifyRecommendationsProps): Promise<SpotifySearchResponse[]> => {
  const artistId = song.artists[0].id;
  const songName = song.name
  const genres = await getArtistGenres(artistId, token);
  console.log(genres);

  // Use map to create an array of promises for each genre
  const genreRequests = genres.map(async (genre: string) => {
    const authOptions: AxiosRequestConfig = {
      url: 'https://api.spotify.com/v1/search',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: `genre:${genre}`,
        type: "track",
        limit: 12
      }
    };

    try {
      const response: AxiosResponse<SpotifySearchResponse> = await Axios(authOptions);
      // Slice the first two items from the response data
      if (response.data?.tracks?.items) {
        response.data.tracks.items = response.data.tracks.items.slice(2);
      }
      return response.data;  // Return the result for each genre
    } catch (error) {
      console.error("Error in Spotify recommendations:", error);
      throw error;
    }
  });

  // Wait for all promises to resolve and aggregate the results
  const allRecommendations = await Promise.all(genreRequests);
  return allRecommendations;  // Return an array of all responses
};

export default getRecommendations;
