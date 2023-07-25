#!/usr/bin/env bash

docker exec -ti $(docker ps | grep pages-gen-serverless | awk '{print $1}') npm run function $@