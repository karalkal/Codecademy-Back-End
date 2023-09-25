const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler')

const PORT = process.env.PORT || 4001;


// // ERROR HANDLER Middleware
// When an object is provided to Express as an error, this module will display as much about this object as possible, 
// and will do so by using content negotiation for the response between HTML, JSON, and plain text.
// if (process.env.NODE_ENV === 'development') {
app.use(errorhandler())
// }

// // STATIC FILES Middleware - If staticfiles in project, use middleware for serving static files to your Express app.
// app.use(express.static('public'));

// // LOGGING Middleware - morgan will log response codes after the response is sent.
// if (!process.env.IS_TEST_ENV) {
app.use(morgan('dev'));
// }

// PARSER Middleware - Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
// bodyParser will automatically attach the parsed body object to req.body.
app.use(bodyParser.json())


const cards = [
  {
    id: 1,
    suit: 'Clubs',
    rank: '2'
  },
  {
    id: 2,
    suit: 'Diamonds',
    rank: 'Jack'
  },
  {
    id: 3,
    suit: 'Hearts',
    rank: '10'
  }
];
let nextId = 4;


// Find card
// Middleware - whenever we have param, check if existing first, if not -> error, if yes -> next()
app.use('/cards/:cardId', (req, res, next) => {
  const cardId = Number(req.params.cardId);
  const cardIndex = cards.findIndex(card => card.id === cardId);
  if (cardIndex === -1) {
    // return res.status(404).send('Card not found');
    const error = new Error(`Not Found: Card with ${cardId} not found`)
    error.status = 404;
    return next(error);
  }
  req.cardIndex = cardIndex;
  next();
});


const validateCard = (req, res, next) => {
  const newCard = req.body;
  const validSuits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  const validRanks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
  if (validSuits.indexOf(newCard.suit) === -1 || validRanks.indexOf(newCard.rank) === -1) {
    // return res.status(400).send('Invalid card!');
    const error = new Error(`Bad Request: Suit or Rank is invalid`)
    error.status = 400;
    return next(error);
  }
  next();
};

// Get all Cards
app.get('/cards/', (req, res, next) => {
  res.send(cards);
});

// Create a new Card
app.post('/cards/', validateCard, (req, res, next) => {
  const newCard = req.body;
  newCard.id = nextId++;
  cards.push(newCard);
  res.status(201).send(newCard);
});

// Get a single Card
app.get('/cards/:cardId', (req, res, next) => {
  res.send(cards[req.cardIndex]);
});

// Update a Card
app.put('/cards/:cardId', validateCard, (req, res, next) => {
  const newCard = req.body;
  const cardId = Number(req.params.cardId);
  if (!newCard.id || newCard.id !== cardId) {
    newCard.id = cardId;
  }
  cards[req.cardIndex] = newCard;
  res.send(newCard);
});

// Delete a Card
app.delete('/cards/:cardId', (req, res, next) => {
  cards.splice(req.cardIndex, 1);
  res.status(204).send();
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
