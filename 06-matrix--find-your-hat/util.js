const prompt = require('prompt-sync')({ sigint: true });
const colors = require("colors/safe");


function displayIntro() {
    console.log(colors.blue('\nYour goal is to find your hat, marked with an ^.'))
    console.log(colors.blue('Avoid falling into the holes ("O") and moving outside the field.'))
    console.log(colors.blue('Exit by pressing "c"'))
    console.log(colors.blue('Use WASD to change position.\n'))
}


function getAndCheckInput() {
    let matrixWidth = Number(prompt(colors.green("Set width (8-26): ")))
    let matrixHeight = Number(prompt(colors.green("Set height 8-26): ")))
    let percentageHoles = Number(prompt(colors.green("Set hole percentage (8-26): ")))

    if (isNaN(matrixWidth) || isNaN(matrixHeight) || isNaN(percentageHoles)
        || matrixWidth < 8 || matrixWidth > 26
        || matrixHeight < 8 || matrixHeight > 26
        || percentageHoles < 8 || percentageHoles > 26) {
        throw new Error("Ain't gonna work like that.")
    }
    return { matrixWidth, matrixHeight, percentageHoles }
}


function randomizeArray(array) {       // credit to https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}


module.exports = { displayIntro, getAndCheckInput, randomizeArray }

