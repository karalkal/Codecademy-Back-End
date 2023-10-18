const express = require('express');
const path = require('path');
const OAuth2Server = require('oauth2-server');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 4001

const oauth = new OAuth2Server({
  model: require("./model"),
  allowBearerTokensInQueryString: true
})

const authenticateRequest = (req, res, next) => {

  let request = new OAuth2Server.Request(req);
  let response = new OAuth2Server.Response(res)

  return oauth.authenticate(request, response)
    .then((token) => {
      next()
    })
    .catch((err) => {
      res.sendFile(path.join(__dirname, 'public/error.html'))
    })
}

const obtainToken = (req, res) => {
  let request = new OAuth2Server.Request(req);
  let response = new OAuth2Server.Response(res);

  return oauth.token(request, response)
    .then((token) => {
      res.json(token);
    })
    .catch((err) => {
      res.json(err);
    })
}

app.all('/auth', obtainToken);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home.html'));
})

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
})

app.get('/public', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/allowed.html'));
})

app.get('/secret', authenticateRequest, (req, res) => {
  res.sendFile(path.join(__dirname, 'public/private.html'));
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

