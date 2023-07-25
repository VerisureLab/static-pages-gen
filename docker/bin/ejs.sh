#!/usr/bin/env bash

docker exec -ti $(docker ps | grep pages-gen-serverless | awk '{print $1}') ejs $@

ABSOLUTE_PROJECT_PATH=$(git rev-parse --show-toplevel)

docker run -ti \
    -v ${ABSOLUTE_PROJECT_PATH}:/projects/pages-gen \
    -w /projects/pages-gen \
    pages-gen-aws npm run template $@
