let events = require('events');

// Callback function to be passed to on method of emitter
let listenerCallback = (data) => {
    console.log('Celebrate ' + data);
}

// Create an instance of the EventEmitter class
let myEmitter = new events.EventEmitter();

// Assign the listenerCallback function as the listener callback for 'celebration' events
myEmitter.on('celebration', listenerCallback)

// Emit a 'celebration' event
myEmitter.emit('celebration', 'NYE') //listenerCallback will be invoked with 'NYE'
