'use strict';
const Promise = require('bluebird');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const process = require('process');
const spawn = require('child_process').spawn;

function git(subcommand, _args, changeDir) {
    let output = "";
    let outerr = "";
    let args = [];

    if (changeDir) {
        args.push('-C');
        args.push(changeDir);
    }

    args.push(subcommand);

    let a = args.concat(_args);
    let proc = spawn("git", a);

    proc.stdout.on("data", function(data) {
        output += data;
    });

    proc.stderr.on("data", function(data) {
        console.error("git: " + data);
        outerr += data;
    });

    return new Promise((resolve, reject) => {
        proc.on("close", function(code) {
            if (code === 0) {
                resolve(output);
            } else {
                reject(outerr + "\ngit exited with status: " + code);
            }
        });
    });
}

function clone(url, rev, repoPath) {
    return git('clone', [url, repoPath])
        .then(() => {
            return git('checkout', [rev], repoPath);
        })
        .then(() => {
            return repoPath;
        });
}

function pull(rev, repoPath) {
    return git('pull', [], repoPath)
        .then(function() {
            return git('checkout', [rev], repoPath);
        })
        .then(function() {
            return repoPath;
        });
}

function get(outPath, url, _rev) {
    let rev = _rev || 'master';
    return new Promise((resolve, reject) => {
        fs.stat(path.join(outPath, '.git'), (err, stat) => {
            if (err && err.code === 'ENOENT') {
                resolve({clone: true});
            } else if (stat.isDirectory()) {
                resolve({pull: true});
            } else {
                reject(err);
            }
        });
    })
    .then((data) => {
        if (data.clone) {
            return clone(url, rev, outPath);
        } else {
            return pull(rev, outPath);
        }
    });
}


exports.get = get;
