const express = require('express');
const cors = require('cors');

var client_id = 'a9b710dbf3c04bb0bab349be18381ffb';
var redirect_uri = 'http://localhost:3000/login';

var app = express();
app.get('/token', function (req, res) {
  const code = req.body.code
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
  });

  res.redirect('https://accounts.spotify.com/authorize?' + params.toString());
});

app.listen(3001, () => {
  console.log('Server Running On Port 3001');
});
