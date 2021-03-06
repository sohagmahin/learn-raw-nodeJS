/*
 * Title: Data Library
 * Description: Data Library functions for CRUD
 * Author: Sohag
 * Date: 28/06/2021
 *
 */

// dependencies
const fs = require('fs');
const path = require('path');

// module scaffolding

const lib = {};

// base directory of the data folder
lib.basedir = path.join(__dirname, '../.data/');

// write data to file
lib.create = (dir, file, data, callback) => {
    // opening file for writing
    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // convert data to string
            const stringData = JSON.stringify(data);

            // write data to file and then close it
            fs.writeFile(fileDescriptor, stringData, (err2) => {
                if (!err2) {
                    fs.close(fileDescriptor, (err3) => {
                        if (!err3) {
                            callback(false);
                        } else {
                            callback('Error closing the new file!');
                        }
                    });
                } else {
                    callback('Error writing to new file!');
                }
            });
        } else {
            callback('There was an error, file may already exists!');
        }
    });
};

// read data from file
lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir}${dir}/${file}.json`, 'utf8', (err, data) => {
        callback(err, data);
    });
};

// update existing file
lib.update = (dir, file, data, callback) => {
    // opening the file
    fs.open(`${lib.basedir}${dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // convert the data to string
            const stringData = JSON.stringify(data);

            // truncate the file
            fs.ftruncate(fileDescriptor, (err1) => {
                if (!err1) {
                    // writing the file and close it
                    fs.writeFile(fileDescriptor, stringData, (err2) => {
                        if (!err2) {
                            fs.close(fileDescriptor, (err3) => {
                                if (!err3) {
                                    callback(false);
                                } else {
                                    callback('Error file closing.');
                                }
                            });
                        } else {
                            callback('Error file writing.');
                        }
                    });
                } else {
                    callback('Error file truncate');
                }
            });
        } else {
            callback("Error opening file, file may does't exist.");
        }
    });
};

// delete file
lib.delete = (dir, file, callback) => {
    //    unlink the file
    fs.unlink(`${lib.basedir}${dir}/${file}.json`, (err) => {
        if (!err) {
            callback(false);
        } else {
            callback('Error delete file');
        }
    });
};

// list all the items in directory

lib.list = (dir, callBack) => {
    fs.readdir(`${lib.basedir}${dir}/`, (err, fileNames) => {
        if (!err && fileNames && fileNames.length > 0) {
            const trimmedFileNames = [];
            fileNames.forEach((fileName) => {
                trimmedFileNames.push(fileName.replace('.json', ''));
            });
            callBack(false, trimmedFileNames);
        } else {
            callBack('Error reading directory!');
        }
    });
};

module.exports = lib;
