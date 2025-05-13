#!/bin/bash

set -e

VERSION=$(grep '"version":' manifest.json | sed -E 's/.*"([0-9]+\.[0-9]+\.[0-9]+)".*/\1/')
ZIP_NAME="NTR_Filter_v${VERSION}.zip"

rm -rf dist
yarn build
cp manifest.json dist/manifest.json
cp public/popup.html dist/popup.html
cp -r public/img dist/img
cp -r public/css dist/css

cd dist
zip -r "../$ZIP_NAME" ./*
cd ..

echo "Release package created: $ZIP_NAME"
