
var glob = require('glob');
var path = require('path');
var Mocha = require('mocha');
var Promise = require('bluebird');

function run() {
    var mocha = new Mocha();
    return new Promise(function(resolve, reject) {
        glob(__dirname+'/test-*.js', function(err, files) {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    })
    .then(function(files) {
        return new Promise(function(resolve, reject) {
            for (var i in files) {
                var file = path.resolve(files[i]);
                mocha.addFile(file);
            }
            resolve();
        });
    })
    .then(function() {
        return new Promise(function(resolve) {
            mocha.run(function(failures){
                process.exit(failures);  // exit with non-zero status if there were failures
            });
        });
    })
    .catch(function(err) {
        console.error(err.stack);
        process.exit(1);
    });
}


process.env.NODE_ENV = 'test';
run();
