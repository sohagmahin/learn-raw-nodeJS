// Asychronus|Promise operation example

const hasMeeting = false;
const meeting = new Promise((resolve, reject) => {
    if (!hasMeeting) {
        const meetingData = {
            name: 'technical meeting',
            date: '13 july',
            time: '10.00 PM',
        };
        resolve(meetingData);
    } else {
        const meetingData = new Error('meeting already scheduled!');
        reject(meetingData);
    }
});

meeting
    .then((res) => {
        console.log(JSON.stringify(res));
    })
    .catch((err) => {
        console.log(err.message);
    });

console.log('hello');
