#!/bin/bash

# go to dist dir
cd dist

# copy each file/dir to local dir, so installation via git/github works
for node in `ls`
do
  cp -R $node ../$node
done

# remove dist/ dir, we don't need it, everything moved to local dir
cd ../
rm -rf dist/

