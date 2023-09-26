const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan')

app.use(express.static('public'));

const PORT = process.env.PORT || 4001;

const vendingMachine = [
    {
        id: 1,
        name: 'Gum',
        price: 1.25,
    },
    {
        id: 7,
        name: 'Bag of chips',
        price: 3.50,
    },
    {
        id: 23,
        name: 'cumin',
        price: .75,
    }
];

let nextSnackId = 24;

// bodyParser
app.use(bodyParser.json());

// Looging
app.use(morgan('dev'));

app.param('snackId', (req, res, next, id) => {
    const idToFind = Number(id);

    const itemIndex = vendingMachine.findIndex(item => item.id === idToFind);
    if (itemIndex !== -1) {
        req.foundItem = vendingMachine[itemIndex];
        req.itemIndex = itemIndex;
        next()

    } else {
        res.status(404).send("Whatever you've been looking for is Not Found.");
    }
});


app.get('/snacks/', (req, res, next) => {
    res.send(vendingMachine);
});

app.post('/snacks/', (req, res, next) => {
    const newSnack = req.body;
    if (!newSnack.name || !newSnack.price) {
        res.status(400).send('Snack not found!');
    } else {
        newSnack.id = nextSnackId++;
        vendingMachine.push(newSnack);
        res.status(201).send(newSnack);
    }
});

app.get('/snacks/:snackId', (req, res, next) => {
    console.log("here", req.foundItem)
    res.send(req.foundItem);
});

app.put('/snacks/:snackId', (req, res, next) => {
    req.foundItem.name = req.body.name;
    req.foundItem.price = req.body.price
    res.status(200).send(req.foundItem);
});

app.delete('/snacks/:snackId', (req, res, next) => {
    vendingMachine.splice(req.itemIndex, 1);
    res.status(204).send("deleted");
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});