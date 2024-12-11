export default async function getUserId(token: string | null) {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`, // Include the access token in the headers
      },
    });
    const data = await response.json();
    return data.id
  }