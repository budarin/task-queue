#!/bin/sh

set -e

export "NODE_ENV"="production";

rm -rf dist;
tsc -p tsconfig.esm.json;
tsc -p tsconfig.types.json;
