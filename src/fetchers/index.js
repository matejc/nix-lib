const crypto = require('crypto');
const process = require('process');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

let prefix = process.env.NIXLIB_FETCHER_PREFIX || '/tmp/nixlib-fetcher';


function mkDir(profileId, url, rev) {
    return new Promise(function (resolve, reject) {
        let hash = crypto.createHash('sha256')
            .update(profileId)
            .update(url)
            .update(rev || `${Date.now()}`)
            .digest('hex');
        const outPath = path.join(prefix, hash);
        mkdirp(outPath, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(outPath);
            }
        });
    });
}

function get(profileId, url) {
    let urlAndRev = url.split('#');
    return mkDir(profileId, urlAndRev[0], urlAndRev[1])
        .then(function (outPath) {
            let fetcher;
            if (url[0] === '/') {
                fetcher = require('./local');
            }else if (urlAndRev[1]) {
                fetcher = require('./git');
            } else {
                fetcher = require('./url');
            }
            console.log(outPath, urlAndRev)
            return fetcher.get(outPath, urlAndRev[0], urlAndRev[1]);
        });
}

module.exports = {get};
