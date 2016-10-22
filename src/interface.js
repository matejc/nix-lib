var spawn = require('child_process').spawn;
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var Promise = require('bluebird');
var fetchers = require('./fetchers');
const evalNix = __dirname + "/scripts/eval.nix";
const buildNix = __dirname + "/scripts/build.nix";
var nixLibProfilesDir = process.env.NIXLIB_PROFILES_DIR || '/tmp/nixlib-profiles';


var nixEnvProcesses = [];

var log = function () {
    if (process.env.NODE_ENV !== 'test' && process.env.DEBUG) {
        console.log.apply(this, arguments);
    }
};

exports.nixEnv = function (args, env, callback, error_callback) {
    var output = "";
    var outerr = "";

    var options = {
        env: (env ? env : process.env)
    };

    var nixProcess = spawn('nix-env', args, options);
    var nixEnvProcessesItem = {
        process: nixProcess
    };
    nixEnvProcesses.push(nixEnvProcessesItem);

    log("nix-env: " + args);

    nixProcess.stdout.on("data", function (data) {
        output += data;
    });

    nixProcess.stderr.on("data", function (data) {
        console.error("nix-env: " + data);
        outerr += data;
    });

    nixProcess.on("close", function (code) {
        for (var i in nixEnvProcesses) {
            if (nixProcess === nixEnvProcesses[i].process) {
                nixEnvProcesses.splice(i, 1);
                break;
            }
        }
        if (code === 0) {
            callback(output.substring(0, output.length - 1));
        } else {
            error_callback(outerr + "\nnix-env exited with status: " + code);
        }
    }.bind(nixProcess));

    return nixEnvProcessesItem;
};

exports.nixInstantiate = function (prefix_args, expression, removeQuotations, useStdin, env, callback, error_callback) {
    var output = "";
    var outerr = "";

    var args = exports.createArgsArray(prefix_args, null, null, useStdin ? ["-"] : []);

    var options = {
        env: (env ? env : process.env)
    };

    var nixProcess = spawn("nix-instantiate", args, options);

    if (useStdin) {
        nixProcess.stdin.write(expression);
        nixProcess.stdin.end();
        // log("nix-instantiate " + args.join(" ") + "\n" + expression);
    } else {
        // log("nix-instantiate " + args.join(" "));
    }
    log("nix-instantiate " + args.join(" "));
    log(expression)

    nixProcess.stdout.on("data", function (data) {
        output += data;
    });

    nixProcess.stderr.on("data", function (data) {
        console.error("nix-instantiate: " + data);
        outerr += data;
    });

    nixProcess.on("close", function (code) {
        if (code === 0) {
            if (removeQuotations) {
                callback(JSON.parse(output));
            } else {
                // callback(output.substring(0, output.length - 1));  // why?
                callback(output);
            }
        } else
            error_callback(outerr + "\nnix-instantiate exited with status: " + code);
    });
};

exports.nixBuild = function (args, env, callback, error_callback) {
    var output = "";
    var outerr = "";

    var options = {
        env: (env ? env : process.env)
    };

    var nixProcess = spawn('nix-build', args, options);

    log("nix-build: " + args);

    nixProcess.stdout.on("data", function (data) {
        output += data;
    });

    nixProcess.stderr.on("data", function (data) {
        console.error("nix-build: " + data);
        outerr += data;
    });

    nixProcess.on("close", function (code) {
        if (code === 0) {
            callback(output.substring(0, output.length - 1));
        } else {
            error_callback(outerr + "\nnix-build exited with status: " + code);
        }
    }.bind(nixProcess));
};

exports.createArgsArray = function (prefix_args, file_arg, profile_arg, postfix_args) {
    var args = [];

    args.push.apply(args, prefix_args);

    if (file_arg) {
        args.push('-f', file_arg);
    }

    if (profile_arg) {
        if (profile_arg === 'current') {
            args.push('-p', '~/.nix-profile');
        } else {
            args.push('-p', profile_arg);
        }
    }

    args.push.apply(args, postfix_args);

    return args;
};

exports.iteratePackages = function (file_arg, profile_arg, env, callback, finish_callback, error_callback) {

    var onProcessed = function (data) {
        var lines = ('' + data).split('\n');
        for (var n = 0; n < lines.length; n++) {
            var arr = /([\w\.\-]+)\s+([\w\.\-\+]+)\s+([\?\=<\>\-]+\ {0,1}[\w\.\-\?]*)\s+(.+)/.exec(lines[n]);
            if (arr === null || arr === undefined) {
                console.warn("line skipped: " + lines[n]);
                continue;
            }

            var attr = arr[1];
            if ((new RegExp(/^nixos\./)).test(attr)) {
                attr = attr.substring(6);
            }
            if (!(new RegExp(/^pkgs\./)).test(attr)) {
                attr = "pkgs." + attr;
            }

            callback(attr, arr[2], arr[3], arr[4]);
        }
        finish_callback();
    };

    var onCurrentSystem = function (currentSystem) {
        file_arg = file_arg ? file_arg : exports.nixpkgs() + '/default.nix';
        var args = exports.createArgsArray(
            ['-qacP'], file_arg, profile_arg, ['--description', '--system-filter', currentSystem]
        );
        exports.nixEnv(args, env, onProcessed, error_callback);
    };

    exports.currentSystem(env, onCurrentSystem, error_callback);

};
exports.allPackages = function (file_arg, profile_arg, env, callback, error_callback) {
    exports.currentSystem(function (currentSystem) {
        var process = function (data) {
            var items = [];
            var lines = ('' + data).split('\n');
            for (var n = 0; n < lines.length; n++) {
                var arr = /([\w\.\-]+)\s+([\w\.\-\+]+)\s+([\?\=<\>\-]+\ {0,1}[\w\.\-\?]*)/.exec(lines[n]);
                if (arr === null) {
                    console.warn("line skipped: " + lines[n]);
                    continue;
                }

                var attr = arr[1];
                if ((new RegExp(/^nixos\./)).test(attr)) {
                    attr = attr.substring(6);
                }
                if (!(new RegExp(/^pkgs\./)).test(attr)) {
                    attr = "pkgs." + attr;
                }
                items.push({
                    attribute: attr,
                    name: arr[2],
                    compare: arr[3]
                });
            }
            log("allPackages: " + items.length);
            callback(items);
        };

        file_arg = file_arg ? file_arg : exports.nixpkgs() + '/default.nix';
        var args = exports.createArgsArray(
            ['-qacP'], file_arg, profile_arg, (currentSystem) ? ['--system-filter', currentSystem] : []
        );

        exports.nixEnv(args, env, process, error_callback);
    }, error_callback);
};

exports.installPackage = function (pkg_attribute, file_arg, profile_arg, env, callback, error_callback) {
    file_arg = file_arg ? file_arg : exports.nixpkgs() + '/default.nix';
    var args = exports.createArgsArray(
        ['-iA', pkg_attribute], file_arg, profile_arg, []);
    exports.nixEnv(args, env, callback, error_callback).attribute = pkg_attribute;
};

exports.uninstallPackage = function (pkg_attribute, pkg_name, file_arg, profile_arg, env, callback, error_callback) {
    file_arg = file_arg ? file_arg : exports.nixpkgs() + '/default.nix';
    var args = exports.createArgsArray(
        ['-e', pkg_name], file_arg, profile_arg, []);
    exports.nixEnv(args, env, callback, error_callback).attribute = pkg_attribute;
};

exports.killNixEnvByAttribute = function (pkg_attribute) {
    for (var i in nixEnvProcesses) {
        if (pkg_attribute == nixEnvProcesses[i].attribute) {
            nixEnvProcesses[i].process.kill("SIGKILL");
            break;
        }
    }
};

exports.killNixEnvAll = function () {
    for (var i in nixEnvProcesses) {
        nixEnvProcesses[i].process.kill("SIGKILL");
    }
};

exports.packageInfo = function (packageAttrStr, file_arg, env, callback, error_callback) {
    exports.nixInstantiate(
        ["--eval", "--strict", "--show-trace"].concat(file_arg ? ["-I", "nixpkgs=" + file_arg] : ["-I", "nixpkgs=" + exports.nixpkgs()]),
        'let \
      pkgs = import <nixpkgs> {}; \
      getAttrFromStr = str: set: (pkgs.lib.getAttrFromPath (pkgs.lib.splitString "." str) set); \
      isDerivation = value: (value ? "type" && value.type == "derivation"); \
      package = (getAttrFromStr "' + packageAttrStr + '" pkgs); \
      getDependencies = list: builtins.map (v: if isDerivation v then {meta = v.meta; name = v.name; path = v.outPath;} else {}) list; \
      data = {meta = package.meta; name = package.name; path = package.outPath; propagatedNativeBuildInputs = getDependencies package.propagatedNativeBuildInputs; nativeBuildInputs = getDependencies package.nativeBuildInputs;}; \
    in builtins.toJSON data',
        false, // remove quotations
        true, // use stdin
        env,
        callback,
        error_callback
    );
};

exports.currentSystem = function (env, callback, error_callback) {
    exports.nixInstantiate(
        ["--eval", "--strict", "--show-trace"],
        'builtins.currentSystem',
        true,
        true,
        env,
        callback,
        error_callback
    );
};

exports.configTree = function (configurationnix, attrs, file_arg, env, callback, error_callback) {
    exports.nixInstantiate(
        [
            "./src/configoptions.nix", "--eval", "--strict", "--show-trace",
            "-A", "dispatch", "--argstr", "attrs", (attrs ? attrs : "configuration")
        ].concat(file_arg ? ["-I", "nixpkgs=" + file_arg] : ["-I", "nixpkgs=" + exports.nixpkgs()]).concat(["--argstr", "configurationnix", configurationnix ? configurationnix : ""]),
        null,
        false,
        false,
        env,
        callback,
        error_callback
    );
};

exports.gitRev = function (file_arg, env, callback, error_callback) {
    exports.nixBuild(
        [
            "./src/revision.nix",
            "--arg", "nixpkgs", file_arg ? file_arg : exports.nixpkgs()
        ],
        env,
        function (file) {
            callback(fs.readFileSync(file, {
                encoding: 'utf8'
            }));
        },
        error_callback
    );
};

exports.listProfiles = function (directory, name, depth, result) {
    var abspath = path.join(directory, name);

    if (name === 'manifest.nix') {
        return result.concat([directory]);
    }
    if (depth === 0 || /\-\d+\-link$/.test(name)) {
        return result;
    }
    try {
        var items = fs.readdirSync(abspath);
        var list = [];
        for (var i in items) {
            list = list.concat(exports.listProfiles(abspath, items[i], depth - 1, result));
        }
        return list;
    } catch (err) {
        return result;
    }
};

exports.makeProfile = function (id, profilePath) {
    return {
        "id": id + "",
        "name": profilePath.split(path.sep).splice(-2).join(path.sep),
        "path": profilePath,
        "profile": endsWith(profilePath, path.sep + 'profile') || endsWith(profilePath, path.sep + '.nix-profile')
    }
}

exports.getProfiles = function (profilePaths) {
    var result = [],
        id = 0;
    for (var i in profilePaths) {
        var list = exports.listProfiles(profilePaths[i], '', 4, []);
        for (var j in list) {
            result.push(exports.makeProfile(id++, list[j]));
        }
    }
    return result;
};

// log(exports.getProfiles(['/nix/var/nix/profiles']))


function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

exports.nixpkgs = function () {
    var result;
    process.env.NIX_PATH.split(path.delimiter).forEach(function (el) {
        var a = /^nixpkgs\=(.+)$/.exec(el);
        if (a !== null) {
            result = a[1];
        }
    });

    if (fs.existsSync(result)) {
        return result;
    }

    var userNixpkgs = '/nix/var/nix/profiles/per-user/' + process.env.USER + '/channels/nixos/nixpkgs';
    if (fs.existsSync(userNixpkgs)) {
        return userNixpkgs;
    } else {
        return '/nix/var/nix/profiles/per-user/root/channels/nixos/nixpkgs';
    }
};


//  new functions lie bellow (will slowly rewrite old ones above):


exports.options = function (configurationnix, file_arg, env) {
    return new Promise(function (resolve, reject) {
        exports.nixInstantiate(
            [
                evalNix, "--eval", "--strict", "--show-trace", "--json",
                "-A", "options", "--arg", "optionsWithVal", !!configurationnix
            ]
                .concat(configurationnix ? ["--argstr", "configurationnix", configurationnix] : [])
                .concat(file_arg ? ["-I", "nixpkgs=" + file_arg] : ["-I", "nixpkgs=" + exports.nixpkgs()]),
            null,
            true,
            false,
            env,
            resolve,
            reject
        );
    })
        .then(function (out) {
            return JSON.parse(out);
        });
};

exports.get = function (configurationnix, path, file_arg, env) {
    return new Promise(function (resolve, reject) {
        if (path) {
            exports.nixInstantiate(
                [
                    evalNix, "--eval", "--strict", "--show-trace", "--json",
                    "-A", "get", "--argstr", "path", path || ''
                ]
                    .concat((configurationnix) ? ["--argstr", "configurationnix", configurationnix] : [])
                    .concat(file_arg ? ["-I", "nixpkgs=" + file_arg] : ["-I", "nixpkgs=" + exports.nixpkgs()]),
                null,
                true,
                false,
                env,
                resolve,
                reject
            );
        } else {
            exports.nixInstantiate(
                ["--eval", "--strict", "--show-trace"],
                `builtins.toJSON (import ${configurationnix})`,
                true,
                true,
                env,
                resolve,
                reject
            );
        }
    })
        .then(function (out) {
            return JSON.parse(out);
        });
};

exports.toNixString = function (object, file_arg, env) {
    return new Promise(function (resolve, reject) {
        exports.nixInstantiate(
            ["--eval", "--strict", "--show-trace"].concat(file_arg ? ["-I", "nixpkgs=" + file_arg] : ["-I", "nixpkgs=" + exports.nixpkgs()]),
            `let
              json = ''${JSON.stringify(object)}'';
            in builtins.fromJSON json`,
            false,
            true,
            env,
            resolve,
            reject
        );
    });
};

exports.merge = function (sourceObj, mergeWithObj, unique, replaceInPlace) {
    function customizer(objValue, srcValue) {
        if (_.isArray(objValue)) {
            if (unique) {
                return _.uniq(objValue.concat(srcValue));
            } else if (replaceInPlace) {
                // normal merge
            } else {
                return objValue.concat(srcValue);
            }
        }
    }
    var result = _.cloneDeep(sourceObj);
    _.mergeWith(result, mergeWithObj, customizer);
    return result;
};

exports.export = function (sourceFile, obj, format, merge) {
    return new Promise(function (resolve) { resolve(); })  // fix this hack
        .then(function () {
            if (sourceFile.toLowerCase().endsWith('.nix')) {
                return exports.get(sourceFile);
            } else {
                return require(sourceFile);
            }
        })
        .then(function (out) {
            if (_.isObject(obj)) {
                if (merge) {
                    out = exports.merge(out, obj);
                } else {
                    Object.assign(out, obj);
                }
            }
            return out;
        })
        .then(function (r) {
            switch (format) {
                case 'json':
                    return JSON.stringify(r);
                case 'pretty':
                    return JSON.stringify(r, null, 4);
                case 'nix':
                    return exports.toNixString(r);
                default:
                    return r;
            }
        });
};

exports.nixBuild = function (args, env) {
    return new Promise((resolve, reject) => {
        var output = "";
        var outerr = "";

        var options = {
            env: (env ? env : process.env)
        };

        var nixProcess = spawn("nix-build", args, options);
        log("nix-build " + args.join(" "));

        nixProcess.stdout.on("data", function (data) {
            output += data;
        });

        nixProcess.stderr.on("data", function (data) {
            console.error("nix-build: " + data);
            outerr += data;
        });

        nixProcess.on("close", function (code) {
            if (code === 0) {
                resolve(_.trim(output));
            } else {
                reject(outerr + "\nnix-build exited with status: " + code);
            }
        });
    });

};

exports.build = function (nixFile, args) {
    var args_ = ['--no-out-link'];
    if (_.isArray(args)) {
        args_ = args_.concat(args);
    }
    return exports.nixBuild(args_.concat(nixFile));
};

exports.validate = function (nixFile, args) {
    return new Promise(function (resolve, reject) {
        var args_ = [nixFile, "--parse", "--show-trace", "-I", "nixpkgs=" + exports.nixpkgs()];
        if (_.isArray(args)) {
            args_ = args_.concat(args);
        }
        exports.nixInstantiate(
            args_,
            null,
            false,
            false,
            null,
            resolve,
            reject
        );
    });
};


exports.set = function (name, key, value) {
    // let prefix = "{pkgs ? import <nixpkgs> {}}:\nwith pkgs.lib;\n";
    let prefix = "";
    return new Promise(function (resolve, reject) {
        var nixFile = path.join(nixLibProfilesDir, name + '.nix');
        var tmpNixFile = path.join(nixLibProfilesDir, name + Date.now() + '.nix.tmp');
        var obj = { [key]: value };
        fs.mkdir(nixLibProfilesDir, function (err) {
            if (err) {
                log(err.stack || err);
            }
            resolve({ nixFile, obj, tmpNixFile });
        })
    })
        .then(function (data) {
            if (fs.existsSync(data.nixFile)) {
                return exports.export(data.nixFile, data.obj, 'nix')
                    .then(function (nixData) {
                        data.nixData = prefix + nixData;
                        return data;
                    });
            } else {
                return exports.toNixString(data.obj)
                    .then(function (nixData) {
                        data.nixData = prefix + nixData;
                        return data;
                    });
            }
        })
        .then(function (data) {
            fs.writeFileSync(data.tmpNixFile, data.nixData);
            return exports.validate(data.tmpNixFile)
                .then(function () {
                    return data;
                });
        })
        .then(function (data) {
            fs.writeFileSync(data.nixFile, data.nixData);
        });
};

exports.getProfile = function (name, format) {
    var nixFile = path.join(nixLibProfilesDir, name + '.nix');
    return exports.export(nixFile, null, format);
};

exports.buildProfile = function (name) {
    let nixFile = path.join(nixLibProfilesDir, name + '.nix');
    return exports
        .export(nixFile)
        .then(function(obj) {
            let paths = {};
            return fetchers.get(name, obj.nixpkgs)
                .then(function(nixpkgsPath) {
                    paths.nixpkgs = nixpkgsPath;
                    return fetchers.get(name, obj.scripts);
                })
                .then(function(scriptsPath) {
                    paths.scripts = scriptsPath;
                    return exports.build(buildNix, [
                        '-I', `nixpkgs=${paths.nixpkgs}`,
                        '-I', `scripts=${paths.scripts}`,
                        '--argstr', 'profilePath', nixFile,
                        '--argstr', 'profileName', name,
                        '--argstr', 'buildScript',
                        path.join(paths.scripts, obj.buildScript),
                    ]);
                });
        });
};
