// normally will be imported of course...
// const api = require('./api.js');


// normally will be extertnal module
// module.exports 
let api = {
    errorProneAsyncApi: (input, callback) => {
        console.log(`Running errorProneAsyncApi with input: ${input}...\n`)
        setTimeout(() => {
            let myErr;
            if (input === 'problematic input') {
                myErr = new Error('whoops')
                callback(myErr)
            } else {
                let responseData = `Received valid input "${input}"`
                callback(myErr, responseData)
            }
        }, 0)
    },

    naiveErrorProneAsyncFunction: (input, callback) => {
        console.log(`Running naiveErrorProneAsyncFunction with input: ${input}...\n`)
        setTimeout(() => {
            if (input === 'problematic input') {
                throw new Error('whoops')
            } else {
                let responseData = `Received valid input "${input}"`
                callback(responseData)
            }
        }, 0)
    }
}

// An error-first callback
let errorFirstCallback = (err, data) => {
    if (err) {
        console.log(`Something went wrong. ${err}\n`);
    } else {
        console.log(`Something went right. Data: ${data}\n`);
    }
};

api.errorProneAsyncApi("problematic input", errorFirstCallback)





