/**
 * Created by diego on 02/03/17.
 */

'use strict';

module.exports = (url, options) => {

    var mongoose = require('mongoose');
    mongoose.Promise = Promise;
    var promise;

    if (options) {
        options.useMongoClient = true;
        promise = mongoose.connect(url, options);
    } else {
        promise = mongoose.connect(url, {useMongoClient: true});
    }

    promise
        .then(() => {
            console.info("Mongoose %s Connected to Database.", mongoose.version);
        }).catch(err => {
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
