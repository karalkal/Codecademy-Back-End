const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));


app.get("/api/quotes", (req, res, next) => {
    let filteredQuotes = quotes
    const searchedAuthor = req.query.person
    if (searchedAuthor) {
        filteredQuotes = quotes.filter(q => q.person === searchedAuthor)
    }
    res.status(200).send({ quotes: filteredQuotes })
})


app.get("/api/quotes/random", (req, res, next) => {
    let quote = getRandomElement(quotes)
    res.status(200).send({ quote })
})

app.post("/api/quotes", (req, res, next) => {
    const { quote, person } = req.query
    if (quote && person) {
        quotes.push({ quote, person })
        // Please note: this will not affect the original data.js 
        // as here we only have copy of it
        // Might export quotes from here and do whatever in another module
        console.log(quotes[quotes.length - 1])
        res.status(201).send()
    } else {
        res.status(400).send()
    }
})


app.listen(PORT, console.log("Listening on port", PORT))

