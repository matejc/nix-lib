'use strict';

const NixInterface = require('../src/interface.js');
const describe = require("mocha").describe;
const it = require("mocha").it;
const before = require("mocha").before;
const expect = require("expect");
const _ = require("lodash");

const inputNixPath = __dirname + '/data/config.nix';

describe('NixInterface.options', () => {

    describe('basic', () => {
        let result;
        before(() => {
            return NixInterface
                .options()
                .then(function(out) {
                    result = out;
                });
        });
        it('expect array not to be empty', () => {
            expect(result.length).toBeGreaterThan(3500);
        });
        it('expect (first) item to be valid', () => {
            expect(result[0].declarations).toBeA('array');
            expect(result[0]).toIncludeKey('default');
            expect(result[0].description).toBeA('string');
            expect(result[0]).toIncludeKey('example');
            expect(result[0].internal).toBeA('boolean');
            expect(result[0].name).toBeA('string');
            expect(result[0].readOnly).toBeA('boolean');
            expect(result[0].type).toBeA('string');
            expect(result[0].visible).toBeA('boolean');
        });
    });

    describe('config.nix', () => {
        let values = {
            obj: {},
            items: []
        };
        before(() => {
            return NixInterface
                .options(inputNixPath)
                .then(function(out) {

                    values.items = _.filter(out, (v) => {
                        return v.val !== undefined && v.val !== null;
                    });
                    values.obj = _.reduce(values.items, function(out, item) {
                        out[item.name] = item;
                        return out;
                    }, {});

                });
        });
        it('expect result not to be empty', () => {
            expect(values.obj).toBeAn('object').toNotBe({});
            expect(values.items).toBeAn('array').toNotBe([]);
        });
        it('expect some items to be boolean', () => {
            expect(values.obj['services.openssh.enable'].val)
                .toBeA('boolean')
                .toBe(true);
            expect(values.obj['services.xserver.desktopManager.kde5.enable'].val)
                .toBeA('boolean')
                .toBe(false);
        });
        it('expect some items to be string', () => {
            expect(values.obj['time.timeZone'].val)
                .toBeA('string')
                .toBe('Europe/Ljubljana');
            expect(values.obj['environment.interactiveShellInit'].val)
                .toBeA('string')
                .toBe('export PATH=$HOME/bin:$PATH\nexport EDITOR="vim"\n');
        });

        it('expect some items to be array', () => {
            expect(values.obj['boot.blacklistedKernelModules'].val)
                .toBeA('array')
                .toInclude('snd_pcsp')
                .toInclude('pcspkr');
        });

        it('expect some items to be object', () => {
            expect(values.obj['users.extraUsers'].val)
                .toBeAn('object')
                .toIncludeKey('sheep');
            expect(values.obj['users.extraUsers'].val.sheep)
                .toBeAn('object')
                .toIncludeKeys(['extraGroups', 'group', 'isNormalUser', 'shell', 'uid']);
        });

    });

});
