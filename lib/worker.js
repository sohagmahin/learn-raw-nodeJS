/*
 * Title: Workers library
 * Description: Worker related files
 * Author: Sohag (www.github.com/sohagmahin)
 * Date: 22/07/2021
 *
 */

// dependecies
const url = require('url');
const http = require('http');
const https = require('https');
const data = require('./data');
const { sendTwilioSms } = require('../helpers/notification');
const { parseJSON } = require('../helpers/utilities');
// worker object - module scaffolding
const worker = {};

// lookup all the checks
worker.gatherAllChecks = () => {
    // get all the checks
    data.list('checks', (err1, checks) => {
        if (!err1 && checks && checks.length > 0) {
            checks.forEach((check) => {
                // read the check data
                data.read('checks', check, (err2, originalCheckData) => {
                    if (!err2 && originalCheckData) {
                        // pass the data to check validator
                        worker.validateCheckData(parseJSON(originalCheckData));
                    } else {
                        console.log('Error: reading one of the checks data!');
                    }
                });
            });
        } else {
            console.log('Error: could not find any checks to process!');
        }
    });
};

// validate individual check data
worker.validateCheckData = (originalCheckData) => {
    const originalData = originalCheckData;
    if (originalCheckData && originalCheckData.id) {
        originalData.state = typeof (originalData.state) === 'string' && ['up', 'down'].indexOf(originalData.state) > -1 ? originalData.state : 'down';
        originalData.lastChecked = typeof (originalData.lastChecked) === 'number' && originalData.lastChecked > 0 ? originalData.lastChecked : false;

        // pass to the next process
        worker.performCheck(originalData);
    } else {
        console.log('Error: check was invalid or not properly formatted!');
    }
};

// perform check
worker.performCheck = (originalCheckData) => {
    // prepare the initial check outcome
    let checkOutCome = {
        error: false,
        responseCode: false,
    };

    // mark the outcome has not been sent yet
    let outcomeSent = false;
    // parse the hostname & full url from original data
    const parsedUrl = url.parse(`${originalCheckData.protocol}://${originalCheckData.url}`, true);
    const { hostname } = parsedUrl;
    const { path } = parsedUrl;

    // construct the request
    const requestDetails = {
        hostname,
        method: originalCheckData.method.toUpperCase(),
        path,
        timeout: originalCheckData.timeoutSeconds * 1000,
    };

    const protocolToUse = originalCheckData.protocol === 'http' ? http : https;

    const req = protocolToUse.request(requestDetails, (res) => {
        // grab the status of the response
        const status = res.statusCode;
        console.log(status);

        checkOutCome.responseCode = status;
        // update the check outcome and pass to the next process
        if (!outcomeSent) {
            worker.processCheckOutcome(originalCheckData, checkOutCome);
            outcomeSent = true;
        }
    });

    req.on('error', (e) => {
        checkOutCome = {
            error: true,
            value: e,
        };
        console.log('on error');
        // update the check outcome and pass to the next process
        if (!outcomeSent) {
            worker.processCheckOutcome(originalCheckData, checkOutCome);
            outcomeSent = true;
        }
    });

    req.on('timeout', (e) => {
        console.log('on timeout');
        checkOutCome = {
            error: true,
            value: 'timeout',
        };
        // update the check outcome and pass to the next process
        if (!outcomeSent) {
            worker.processCheckOutcome(originalCheckData, checkOutCome);
            outcomeSent = true;
        }
    });

    // reqest send
    req.end();
};

// save check outcome to database and send to next process
worker.processCheckOutcome = (originalCheckData, checkOutCome) => {
    // check if check outcome is up or down
    const state = !checkOutCome.error && checkOutCome.responseCode
    && originalCheckData.successCodes.indexOf(checkOutCome.responseCode) > -1 ? 'up' : 'down';

    // decide we should alter the user or not
    const alertWanted = !!(originalCheckData.lastChecked && originalCheckData.state !== state);

    // update the check data
    const newCheckData = originalCheckData;
    newCheckData.state = state;
    newCheckData.lastChecked = Date.now();

    // update the check to disk
    data.update('checks', newCheckData.id, newCheckData, (err) => {
        if (!err) {
            if (alertWanted) {
                // send the checkdata to next process
                worker.alertUserToStatusChanges(newCheckData);
            } else {
                console.log('Alert is not needed as there is no state changes!');
            }
        } else {
            console.log('Error trying to save check data of one of the checks!');
        }
    });
};

// send notification sms to user if state changes
worker.alertUserToStatusChanges = (newCheckData) => {
    const msg = `Alert: Your check for ${newCheckData.method.toUpperCase()} 
    ${newCheckData.protocol}://${newCheckData.url} is currently ${newCheckData.state}`;

    sendTwilioSms(newCheckData.userPhone, msg, (err) => {
        if (!err) {
            console.log(`User was alerted to a status change via SMS: ${msg}`);
        } else {
            console.log('There was a problem sending sms to one of the user');
        }
    });
};

// timer to execute the worker process once per minute
worker.loop = () => {
    setInterval(() => {
        worker.gatherAllChecks();
    }, 5000);
};

// init the server
worker.init = () => {
    // execute all the checks
    worker.gatherAllChecks();

    // call the loop so that checks continue
    worker.loop();
};

// export module
module.exports = worker;
