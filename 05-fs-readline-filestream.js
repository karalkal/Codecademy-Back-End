/*
In more realistic scenarios, data isn’t processed all at once but rather sequentially, piece by piece, in what is known as a stream. 
Streaming data is often preferable since you don’t need enough RAM to process all the data at once 
nor do you need to have all the data on hand to begin processing it.
One of the simplest uses of streams is reading and writing to files line-by-line. 
To read files line-by-line, we can use the .createInterface() method from the readline core module. 
.createInterface() returns an EventEmitter set up to emit 'line' events:
*/

const readline = require('readline');
const fs = require('fs');

const myInterface = readline.createInterface({
    input: fs.createReadStream('05-read-data.txt')
});


let count = 0

// create file to write data to
const fileStream = fs.createWriteStream('05-written-data.txt');

const printAndWrite = (newLine) => {
    console.log(`Printing: ${count}: ${newLine}`)
    fileStream.write(`Writing: ${count}: ${newLine}\n`)
    count++
}

myInterface.on("line", printAndWrite)
