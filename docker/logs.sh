#!/usr/bin/env bash

docker logs -f $(docker ps | grep pages-gen-serverless | awk '{print $1}')