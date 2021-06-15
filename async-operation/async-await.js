// Asychronus|Promise operation example

const hasMeeting = true;
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

async function myMeeting() {
    try {
        const meetingResponse = await meeting;
        const calendar = await addCalendar(meetingResponse);
        console.log(calendar);
    } catch {
        console.log('something went wrong!');
    } finally {
        console.log('task completed');
    }
}

myMeeting();

console.log('hello');
