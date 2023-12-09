const express = require('express');
const app = express();

const cors = require('cors')
const bodyParser = require('body-parser');
const morgan = require('morgan')

const parentRouter = require('./routers/parentRouter');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const PORT = process.env.PORT || 3000;

require("express-async-errors");

// middleware for handling CORS requests from index.html
app.use(cors())

// Logging
app.use(morgan('dev'));

// bodyParser
app.use(bodyParser.json());

// Mount apiRouter at the '/api' path.
app.use("/api/v1", parentRouter);

// error handlers
// This middleware must be mounted at the very bottom of the call stack, after all the other declarations
// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);

app.listen(PORT, console.log("I'm all ears at port", PORT))


module.exports = app;