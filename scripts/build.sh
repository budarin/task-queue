#!/bin/sh

set -e

export "NODE_ENV"="production";

rm -rf dist;
tsc -p tsconfig.cjs.json;
tsc -p tsconfig.esm.json;
tsc -p tsconfig.types.json;
echo '{"type": "commonjs"}' > dist/cjs/package.json
echo '{"type": "module"}' > dist/esm/package.json