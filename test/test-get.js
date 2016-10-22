'use strict';

const NixInterface = require('../src/interface.js');
const describe = require("mocha").describe;
const it = require("mocha").it;
const before = require("mocha").before;
const expect = require("expect");
const _ = require("lodash");

const inputNixPath = __dirname + '/data/config.nix';

describe('NixInterface.get', () => {
    it('expect endpoint to have value', () => {
        return NixInterface
            .get(inputNixPath, 'services.xserver.desktopManager.enlightenment.enable')
            .then(function(result) {
                expect(result).toBeA('boolean').toBe(true);
            });
    });
    it('expect midpoint to be object', () => {
        return NixInterface
            .get(inputNixPath, 'services.xserver.desktopManager')
            .then(function(result) {
                expect(result).toBeA('object').toIncludeKeys([
                    'default', 'enlightenment', 'kde5'
                ]);
                expect(result.default).toBeA('string').toBe('Enlightenment');
                expect(result.enlightenment).toBeA('object').toIncludeKey('enable');
                expect(result.enlightenment.enable).toBeA('boolean').toBe(true);
                expect(result.kde5).toBeA('object').toIncludeKey('enable');
                expect(result.kde5.enable).toBeA('boolean').toBe(false);
            });
    });
    it('expect result to be root object', () => {
        return NixInterface
            .get(inputNixPath)
            .then(function(result) {
                expect(result).toBeA('object').toIncludeKeys([
                    'boot', 'environment', 'fonts', 'hardware', 'i18n',
                    'networking', 'nix', 'nixpkgs', 'powerManagement',
                    'programs', 'security', 'services', 'sound', 'time',
                    'users', 'virtualisation'
                ]);
            });
    });
});
