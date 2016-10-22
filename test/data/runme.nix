{pkgs ? import <nixpkgs> {}, ...}:
let
    drv = pkgs.writeScriptBin "beje" ''
        echo beje
    '';
in
    drv
