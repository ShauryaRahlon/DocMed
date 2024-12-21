const accountSid = 'US4fcafa75e7c7368ef20bccf5f52c790a';
const authToken = '6976fdf6894e56575bd3d7d8ae717ac3';
const client = require('twilio')(accountSid, authToken);
client.messages
    .create({
        to: '[HandsetNumber]'
    })
    .then(message => console.log(message.sid));