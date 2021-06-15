const EventsEmitter = require('events');

class School extends EventsEmitter {
    startSchool() {
        console.log('inside school function');
        console.log('waiting....');
        setTimeout(() => {
            this.emit('raised', {
                period: 'first period',
                task: 'first period ended',
            });
        }, 2000);
    }
}

module.exports = School;
