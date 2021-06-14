const School = require('./school');

const school = new School();
school.startSchool();

school.on('raised', ({ period, task }) => {
    console.log(`Event one is ended ${period} ${task}`);
});
