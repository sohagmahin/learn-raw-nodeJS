// Asychronus|Promise operation example

const hasMeeting = false;
const meeting = new Promise((resolve, reject) => {
    if (!hasMeeting) {
        const meetingDetails = {
            name: 'technical meeting',
            location: 'Zoom',
            time: '10.00 PM',
        };
        resolve(meetingDetails);
    } else {
        const meetingDetails = new Error('meeting already scheduled!');
        reject(meetingDetails);
    }
});

const addCalendar = (meetingDetails) => {
    const calendar = `${meetingDetails.name} has been scheduled on ${meetingDetails.location} at ${meetingDetails.time}`;
    return Promise.resolve(calendar);
};

meeting
    .then(addCalendar)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err.message);
    });

console.log('hello');
