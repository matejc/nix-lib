var nix = require('./src/interface.js');

nix.set('runme', 'nixpkgs', "https://github.com/matejc/nixpkgs#mylocal57")
    .then(function(){
        // return nix.set('runme', 'scripts', 'https://github.com/matejc/hydra_scripts#master');
        return nix.set('runme', 'scripts', '/home/matejc/workarea/nix-lib/test/data');
    })
    .then(function(){
        return nix.set('runme', 'buildScript', 'runme.nix');
    })
    .then(function(){
        return nix.set('runme', 'attrs', ['pkgs.zsh']);
    })
    .then(function(){
        return nix.set('runme', 'supportedSystems', ['x86_64-linux']);
    })
    .then(function(){
        return nix.getProfile('runme', 'pretty');
    })
    .then(function(out){
        console.log(out)
    })
    .then(function(){
        return nix.buildProfile('runme');
    })
    .then(function(out){
        console.log(`Success, out path: ${out}`)
    })
    .catch(function(err) {
        console.error(err.stack||err);
        console.error('ERROR');
    });

// nix.validate('runme.nix')
//     .then(function(result){
//         console.log('OK');
//     })
//     .catch(function() {
//         console.error('ERROR');
//     });

// nix.build('runme.nix')
//     .then(function(outPath){
//         console.log({outPath});
//     });
