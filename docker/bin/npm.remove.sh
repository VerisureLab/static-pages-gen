#!/usr/bin/env bash
#
ABSOLUTE_PROJECT_PATH=$(git rev-parse --show-toplevel)

docker run -ti \
    -v ${ABSOLUTE_PROJECT_PATH}:/projects/pages-gen \
    -w /projects/pages-gen \
    pages-gen-aws npm uninstall $@
