1. `npm install oauth2-server`  
    `const OAuth2Server = require('oauth2-server');`  
2. create an instance of the OAuth2Server object and store it in a variable named oauth.  
Inside the constructor of OAuth2Server, pass an object with an attribute named model, and we’ll import model.js using the require() function as the value.  
OAuth2Server can be supplied with additional options in the constructor. To pass tokens inside the URL, we’ll set the allowBearerTokensInQueryString attribute to true.  
The lifetime is set in seconds, and we can set the access token lifetime to one hour like this:

```javascript
const oauth = new OAuth2Server({
  model: require('./model.js'),
  allowBearerTokensInQueryString: true,
  accessTokenLifetime: 60 * 60
})
```

3. in db.js:  

```javascript
module.exports = {
  confidentialClients: [{
    clientId: 'codecademy',
    clientSecret: 'codec@demy',
    grants: [
      'client_credentials'
    ]
  }],
    tokens: []
}
```
and import it an model.js

4. OAuth2Server requires certain functions implemented in the model regardless of the authorization flow used. The getClient() function is an example of a required model function for all flows. The function is used to retrieve a client using a Client ID and/or a Client Secret combination.

5. The saveToken() function must be implemented for all grant types in the model used by OAuth2Server. This function stores the access token as an object to a database when an access token is obtained.  
The saveToken() function is implemented with three arguments: token, client, and user. We set the token.client equal an object in which the id attribute is equal to the passed client’s clientId.  
The token.user is set equal to an object with the username attribute. We set the username attribute equal to the username of the passed user object.   
With the token formatted, we can save the token to our database by pushing the token to our db.tokens array and returning the token.  

```javascript
const saveToken = (token, client, user) => {
  token.client = {
    id: client.clientId
  }
  token.user = {
    username: user.username
  }
  db.tokens.push(token);
  return token;
}
```

6. Certain grant types have specific functions that must be implemented for them to work. The Client Credentials grant type must have the getUserFromClient() function implemented to be used.  
The getUserFromClient() function is invoked to retrieve the user associated with the specified client. We are not using a user in our application so we can return an empty object. However, leaving out this function declaration will throw an error when using the Client Credentials grant type!

7. Obtaining Token Handler  
Now that our model functions for generating and saving access tokens are implemented in model.js, we need to create a callback function to handle obtaining the access token whenever a URL is requested in our application. Within app.js, we create a function named obtainToken():  

```javascript
const obtainToken = (req, res) => {
  let request = new OAuth2Server.Request(req);
  let response = new OAuth2Server.Response(res);

  return oauth
    .token(request, response)
    .then((token) => {
      res.json(token);
    })
    .catch((err) => {
      res.status(err.code || 500).json(err);
    });
};

```

8. getAccessToken()  
Now that we’ve written the code to obtain an access token, we can use it to restrict access to content unless a user is authenticated with a valid access token. Inside model.js, we implement the getAccessToken() function to retrieve existing tokens that were previously saved when the saveToken() function is invoked.

9. authenticateRequest middleware added to '/secret'  

10. test

```
curl --request POST \
--url http://localhost:4001/auth \
--header 'authorization: Basic Y29kZWNhZGVteTpjb2RlY0BkZW15' \
--header 'content-type: application/x-www-form-urlencoded' \
--data grant_type=client_credentials
```

```
curl --request GET \
--url http://localhost:4001/secret \
--header 'authorization: Bearer <ACCESS_TOKEN>'
```
