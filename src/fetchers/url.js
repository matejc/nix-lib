'use strict';
const got = require('got')
const unpackStream = require('unpack-stream')

function get(outPath, url) {
    const stream = got.stream(url);
    return unpackStream.remote(stream, outPath)
        .then(function () {
            return outPath;
        });
}


exports.get = get;
