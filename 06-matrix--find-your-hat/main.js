const prompt = require('prompt-sync')({ sigint: true });
const colors = require("colors/safe");

const { displayIntro, getAndCheckInput, randomizeArray } = require('./util');


const hatChar = colors.bgBlack('^');
const holeChar = colors.bgBlack('O');
const fieldChar = colors.gray('░');
const positionChar = colors.bgBlack('⌖')
const pathChar = ' ';
const deadChar = colors.magenta("x")

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
            console.log(r.join(""))
            // console.log(r.join(""), this.xPosition, this.yPosition)
        }
    }

    static generateField(width, height, percentageHoles) {
        // 1. create array (ordered)
        const totalArea = width * height
        const holesCount = Math.round(percentageHoles / 100 * totalArea)              // percent of area (round) 
        const accessibleCount = totalArea - holesCount - 2                            // minus current position and target positiin
        const array = [hatChar, positionChar]
            .concat(new Array(holesCount).fill(holeChar))
            .concat(new Array(accessibleCount).fill(fieldChar))
        // 2. shuffle it
        let randomizedArray = randomizeArray(array)
        // 3. make it two dimensional and determine initial X and Y
        let initialData = this.createMatrixFindInitialPosition(randomizedArray, width, height)
        let matrix = initialData.matrix
        let xPosition = initialData.xInitial
        let yPosition = initialData.yInitial
        // 4. update this (arg given to constructor)    
        return new this(matrix, xPosition, yPosition)
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
                if (item === positionChar) {
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
        // set direction to print afterwards, replace current position with pathChar, resert position in axis to change afterwards
        switch (nextMove) {
            case "w" || "W":
                direction = "UP";
                this.field[this.yPosition][this.xPosition] = pathChar
                this.yPosition--
                break;
            case "d" || "D":
                direction = "RIGHT";
                this.field[this.yPosition][this.xPosition] = pathChar
                this.xPosition++
                break;
            case "s" || "S":
                direction = "DOWN";
                this.field[this.yPosition][this.xPosition] = pathChar
                this.yPosition++
                break;
            case "a" || "A":
                direction = "LEFT";
                this.field[this.yPosition][this.xPosition] = pathChar
                this.xPosition--
                break;
            default:
                direction = "Error!"
        }
        if (this.field[this.yPosition][this.xPosition] === holeChar) {
            this.field[this.yPosition][this.xPosition] = deadChar
            throw new Error("Ya dead! Down in a whole!")
        }

        console.log(colors.cyan("Moved", direction, "\n"))
        this.field[this.yPosition][this.xPosition] = positionChar
    }
}

displayIntro();

try {
    const { matrixWidth, matrixHeight, percentageHoles } = getAndCheckInput();

    // newField.generateField(matrixWidth, matrixHeight, percentageHoles)   // static method, cannot call it with an instance
    let newMatrix = Field.generateField(matrixWidth, matrixHeight, percentageHoles)
    console.clear()
    console.log(colors.america("Godspeed!!!\n"))

    while (true) {
        newMatrix.print()
        console.log()

        let nextMove = prompt(colors.green("Next Move: "))
        console.clear()
        if (nextMove === "c" || nextMove === "C") {
            console.clear()
            console.log(colors.blue("Thanks, see ya later.\n"))
            break
        }
        if (!(["a", "s", "d", "w", "A", "S", "D", "W"].includes(nextMove))) {
            console.log(colors.red("Opps...\n"))
            continue
        }
        // if neither break, nor continue
        try {
            newMatrix.move(nextMove)
        } catch (error) {
            // console.clear()
            console.log(colors.inverse.red(error.message + "\n"))
            newMatrix.print()
            break
        }

    }
}
catch (error) {
    console.log(colors.red("\n" + error.message + "\n"))
}





