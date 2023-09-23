const prompt = require('prompt-sync')({ sigint: true });
const colors = require("colors/safe");

const { displayIntro, getAndCheckInput, randomizeArray } = require('./util');


const hatChar = colors.bgBlack('^');
const holeChar = colors.bgBlack('O');
const fieldChar = colors.gray('░');
const positionChar = colors.bgBlack('⌖')
const pathChar = ' ';
const deadChar = colors.magenta("✝")
const trophyChar = colors.red("◯")


class Field {
    constructor(field, xPosition, yPosition) {
        this.field = field
        this.xPosition = xPosition
        this.yPosition = yPosition
    }

    print() {
        for (let r of this.field) {
            console.log(r.join(""))
            // console.log(r.join(""), "X-pos:", this.xPosition, "Y-pos:", this.yPosition, "X-len", this.field[0].length, "Y-len", this.field.length)
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
                // out of bounds
                if (this.yPosition === 0) {
                    this.field[this.yPosition][this.xPosition] = deadChar


                    throw new Error("Gone in Heaven!")
                }
                // otherwise keep going
                this.field[this.yPosition][this.xPosition] = pathChar
                this.yPosition--
                break;
            case "d" || "D":
                direction = "RIGHT";
                if (this.xPosition === this.field[0].length - 1) {
                    this.field[this.yPosition][this.xPosition] = deadChar


                    throw new Error("Went too far!")
                }
                this.field[this.yPosition][this.xPosition] = pathChar
                this.xPosition++
                break;
            case "s" || "S":
                direction = "DOWN";
                if (this.yPosition === this.field.length - 1) {
                    this.field[this.yPosition][this.xPosition] = deadChar


                    throw new Error("Gone in the Under World!")
                }
                this.field[this.yPosition][this.xPosition] = pathChar
                this.yPosition++
                break;
            case "a" || "A":
                direction = "LEFT";
                if (this.xPosition === 0) {
                    this.field[this.yPosition][this.xPosition] = deadChar


                    throw new Error("Gone Leftfield!")
                }
                this.field[this.yPosition][this.xPosition] = pathChar
                this.xPosition--
                break;
            default:
                direction = "Error!"
        }
        // fell in hole
        if (this.field[this.yPosition][this.xPosition] === holeChar) {
            this.field[this.yPosition][this.xPosition] = deadChar
            throw new Error("Down in a hole!")
        }
        // won (doesn't make sense to throw error but it's easier)
        if (this.field[this.yPosition][this.xPosition] === hatChar) {
            this.field[this.yPosition][this.xPosition] = trophyChar
            throw new Error("Well done buddy!")
        }

        console.log(colors.cyan("Moved", direction, "\n"))
        this.field[this.yPosition][this.xPosition] = positionChar
    }

}

displayIntro();

try {
    // If input is valid set up and start Gamepad, else, go to catch below
    const { matrixWidth, matrixHeight, percentageHoles } = getAndCheckInput();

    // newField.generateField(matrixWidth, matrixHeight, percentageHoles)   // static method, cannot call it with an instance
    let matrix = Field.generateField(matrixWidth, matrixHeight, percentageHoles)
    console.clear()
    console.log(colors.america("Godspeed!!!\n"))

    while (true) {
        // Print matrix and get user input
        matrix.print()
        let nextMove = prompt(colors.green("Next Move: "))

        // After getting user input, clear matrix. At next iteration it will display again in its new state
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
            matrix.move(nextMove)
        } catch (error) {
            if (error.message === "Well done buddy!") {
                console.log(colors.rainbow(error.message + "\n"))
            }
            else {
                console.log(colors.inverse.red(error.message + "\n"))
            }
            matrix.print()
            break
        }
    }
}
catch (error) {
    console.log(colors.red("\n" + error.message + "\n"))
}





