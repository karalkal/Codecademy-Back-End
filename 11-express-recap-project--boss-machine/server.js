const express = require('express');
const app = express();

const cors = require('cors')
const bodyParser = require('body-parser');
const morgan = require('morgan')

const apiRouter = require('./server/api');

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// middleware for handling CORS requests from index.html
app.use(cors())

// Logging
app.use(morgan('dev'));

// bodyParser
app.use(bodyParser.json());

// Mount your existing apiRouter at the '/api' path.
app.use("/api", apiRouter)


// This conditional is here for testing purposes:
if (!module.parent) {
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, console.log("I'm all ears at port", PORT))

}
