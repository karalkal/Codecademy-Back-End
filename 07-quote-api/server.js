const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get("/api/quotes", (req, res, next) => {
    let filteredQuotes = quotes
    const searchedAuthor = req.query.autor
    console.log("author", searchedAuthor)
    if (searchedAuthor) {
        filteredQuotes = quotes.filter(q => q.author === searchedAuthor)
    }

    console.log(filteredQuotes)
    res.status(200).send({ quotes })
})

app.get("/api/quotes/random", (req, res, next) => {
    let quote = getRandomElement(quotes)
    console.log(quote)
    res.status(200).send({ quote })
})

app.listen(PORT, console.log("Listening on port", PORT))

