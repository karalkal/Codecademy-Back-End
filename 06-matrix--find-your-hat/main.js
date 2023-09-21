const prompt = require('prompt-sync')({ sigint: true });

const hatChar = '^';
const holeChar = '◉';
const fieldChar = '░';
const pathChar = '*';
// The player will begin in the upper-left of the field, and the player’s path is represented by *
// Will put it at random position to make it more challneging


class Field {
    constructor(field, xPosition, yPosition) {
        this.field = field
        this.xPosition = xPosition
        this.yPosition = yPosition
    }

    print() {
        for (let r of this.field) {
            console.log(r.join(""), this.xPosition, this.yPosition)
        }
    }

    static generateField(width, height, percentageHoles) {
        // 1. create array (ordered)
        const totalArea = width * height
        const holesCount = Math.round(percentageHoles / 100 * totalArea)              // percent of area (round) 
        const accessibleCount = totalArea - holesCount - 2                            // minus current position and target positiin
        const array = [hatChar, pathChar]
            .concat(new Array(holesCount).fill(holeChar))
            .concat(new Array(accessibleCount).fill(fieldChar))
        // 2. shuffle it
        let randomizedArray = this.randomizeArray(array)
        // 3. make it two dimensional and determine initial X and Y
        let initialData = this.createMatrixFindInitialPosition(randomizedArray, width, height)
        let matrix = initialData.matrix
        let xPosition = initialData.xInitial
        let yPosition = initialData.yInitial
        // 4. update this        
        return new this(matrix, xPosition, yPosition)
    }

    static randomizeArray(initilArray) {       // credit to https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        let currentIndex = initilArray.length, randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex > 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [initilArray[currentIndex], initilArray[randomIndex]] = [
                initilArray[randomIndex], initilArray[currentIndex]];
        }
        return initilArray;
    }

    static createMatrixFindInitialPosition(originalArray, width, height) {
        let matrix = []
        let xInitial = null
        let yInitial = null

        for (let row = 0; row < height; row++) {
            let newRow = []
            for (let col = 0; col < width; col++) {
                let item = originalArray.pop()      // will basically reverse it around but who cares
                // find initial position of *
                if (item === pathChar) {
                    xInitial = col
                    yInitial = row
                }
                newRow.push(item)
            }
            matrix.push(newRow)
        }
        return { matrix, xInitial, yInitial }
    }

    move(nextMove) {
        let direction = ""

        switch (nextMove) {
            case "w" || "W":
                direction = "UP";
                this.yPosition--
                break;
            case "d" || "D":
                direction = "RIGHT";
                this.xPosition++
                break;
            case "s" || "S":
                direction = "DOWN";
                this.yPosition++
                break;
            case "a" || "A":
                direction = "LEFT";
                this.xPosition--
                break;
            default:
                direction = "Error!"
        }
        if (this.field[this.yPosition][this.xPosition] === holeChar) {
            throw new Error("Ya dead!")
        }
        this.field[this.yPosition][this.xPosition] = pathChar
    }
}


console.log('Your goal is to find your hat, marked with an ^.\nExit by pressing "c", landing on (and falling in) a hole \or moving "outside" the field.')
console.log('Use WASD to change position.')

let matrixWidth = Number(prompt("Set width (8-26): "))
let matrixHeight = Number(prompt("Set height  (8-26): "));
let percentageHoles = Number(prompt("Set hole percentage (8-26): "))

if (typeof matrixWidth === "NaN" || typeof matrixHeight === "NaN" || typeof percentageHoles === "NaN"
    || matrixWidth < 8 || matrixWidth > 26
    || matrixHeight < 8 || matrixHeight > 26
    || percentageHoles < 8 || percentageHoles > 26) {
    console.log("Ain't gonna work.")
    return
} else {
    // newField.generateField(matrixWidth, matrixHeight, percentageHoles)   // static method, cannot call it with an instance
    let newMatrix = Field.generateField(matrixWidth, matrixHeight, percentageHoles)
    console.clear()

    while (true) {
        newMatrix.print()

        let nextMove = prompt("NextMove: ")
        console.clear()
        if (nextMove === "c") {
            console.clear()
            console.log("Thanks, see ya later.")
            break
        }
        if (!(["a", "s", "d", "w", "A", "S", "D", "W"].includes(nextMove))) {
            console.log("Opps.")
            continue
        }
        // if neither break, nor continue
        newMatrix.move(nextMove)

    }
}



