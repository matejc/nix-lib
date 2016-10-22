'use strict';
const ncp = require('ncp');

function get(outPath, path) {
    return new Promise(function(resolve, reject) {
        ncp(path, outPath, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(outPath);
            }
        });
    });
}


exports.get = get;
