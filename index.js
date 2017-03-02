/**
 * Created by diego on 02/03/17.
 */

'use strict';

module.exports = (url, options) => {

    var mongoose = require('mongoose');

    if (options) {
        mongoose.connect(url, options);
    } else {
        mongoose.connect(url);
    }

    mongoose.connection.on('connected', () => {
        console.info("Mongoose %s Connected to Database. %s", mongoose.version, url);
});

mongoose.connection.on('error', err => {
    console.error("Database or Mongoose error. %s", err.stack);
});
mongoose.connection.on('disconnected', () => {
    console.error("Mongoose default connection disconnected, el proceso %s se abortará", process.pid);
process.exit();
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
    console.info("Mongoose default connection disconnected through app termination");
process.exit();
});
});

};
