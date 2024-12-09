import Axios from "axios";
export default async function Token(code: string) {
    var client_id = 'a9b710dbf3c04bb0bab349be18381ffb';
    var client_secret = '847cee3f052d4230b2b793b772aff5a3';
    var redirect_uri = 'http://localhost:3000/auth';
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      data: new URLSearchParams({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      }).toString()
    };

    const response = await Axios(authOptions);
    return response.data;
  };
  