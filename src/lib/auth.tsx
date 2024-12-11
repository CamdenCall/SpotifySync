
export default function Auth() {
  var client_id = 'a9b710dbf3c04bb0bab349be18381ffb';
  var redirect_uri = 'http://localhost:3000/auth';
  var scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`
};
