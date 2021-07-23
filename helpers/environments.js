/*
 * Title: Environments
 * Description: Handle environments
 * Author: Sohag (www.github.com/sohagmahin)
 * Date: 28/06/2021
 *
 */

// dependencies

// module scaffolding
const environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'sfhlsfsldfklshf',
    maxChecks: 5,
    twilio: {
        fromPhone: '+14155346807',
        accountSid: 'PUT_YOUR_OWN_TWILIO_ACSID',
        authToken: 'PUT_YOUR_OWN_TWILIO_TOKEN',
    },
};

environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'hklhjfse3324lfslklhjldf',
    maxChecks: 5,
    twilio: {
        fromPhone: '+14155346807',
        accountSid: 'PUT_YOUR_OWN_TWILIO_ACSID',
        authToken: 'PUT_YOUR_OWN_TWILIO_TOKEN',
    },
};

// determine which environment was passed
const currentEnvironment = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment object
const environmentToExport = typeof environments[currentEnvironment] === 'object'
        ? environments[currentEnvironment]
        : environments.staging;

module.exports = environmentToExport;
