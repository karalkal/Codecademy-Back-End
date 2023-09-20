const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(field) {        // will receive two-dimentional matrix
        this.field = field
    }

    print() {
        for (let r of this.field) {
            console.log(r.join(""))
        }
    }

    static generateField(width, height, percentageHoles) {
        const totalArea = width * height
        const holesCount = Math.floor(percentageHoles * 100 / totalArea)       // percent of area (floor) 
        const pathCount = totalArea - holesCount - 2                            // minus current position and target positiin
        console.log(holesCount, pathCount)
        const array = [hat, pathCharacter]
            .concat(new Array(holesCount).fill(hole))
            .concat(new Array(pathCount).fill(fieldCharacter))


        let randomizedArray = this.randomizeArray(array)
        this.field = [randomizedArray]
        
        console.log(this.field)
    }

    static randomizeArray(array) {       // credit to https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
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

}

console.log('Your goal is to find your hat, marked with an ^.\nExit by pressing "c", landing on (and falling in) a hole \or moving "outside" the field.')
console.log('Use WASD to change position.')

let matrixWidth = Number(prompt("Set width (4-26): "))
let matrixHeight = Number(prompt("Set height  (4-26): "));
let percentageHoles = Number(prompt("Set hole percentage (8-44): "))

if (typeof matrixWidth === "NaN" || typeof matrixHeight === "NaN" || typeof percentageHoles === "NaN"
    || matrixWidth < 4 || matrixWidth > 26
    || matrixHeight < 4 || matrixHeight > 26
    || percentageHoles < 8 || percentageHoles > 44
) {
    console.log("Ain't happening")
    return
} else {
    // newField.generateField(matrixWidth, matrixHeight, percentageHoles)   // static method, cannot call it with an instance
    Field.generateField(matrixWidth, matrixHeight, percentageHoles)   // static method, cannot call it with an instance
}

