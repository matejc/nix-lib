{ buildScript
, profilePath
, profileName }:
let
    profile = import profilePath;
    build = import buildScript profile;
in
    build