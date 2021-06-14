const EventsEmitter = require('events');

const myEmitter = new EventsEmitter();

myEmitter.on('raised', ({ period, task }) => {
    console.log(`Event one is ended ${period} ${task}`);
});

setTimeout(() => {
    myEmitter.emit('raised', {
        period: 'first period',
        task: 'first period ended',
    });
}, 2000);
