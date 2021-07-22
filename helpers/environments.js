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
        accountSid: 'AC9dba3867338d9586b9151d1439c70fdf',
        authToken: '4289e32d37843f99d24010dab9e7b452',
    },
};

environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'hklhjfse3324lfslklhjldf',
    maxChecks: 5,
    twilio: {
        fromPhone: '+14155346807',
        accountSid: 'AC9dba3867338d9586b9151d1439c70fdf',
        authToken: '4289e32d37843f99d24010dab9e7b452',
    },
};

// determine which environment was passed
const currentEnvironment = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment object
const environmentToExport = typeof environments[currentEnvironment] === 'object'
        ? environments[currentEnvironment]
        : environments.staging;

module.exports = environmentToExport;
