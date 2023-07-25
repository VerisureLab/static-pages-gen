#!/usr/bin/env bash

docker stop $(docker ps | grep pages-gen-serverless | awk '{print $1}')