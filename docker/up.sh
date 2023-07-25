#!/usr/bin/env bash

ABSOLUTE_PROJECT_PATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )/.."

docker run -d --rm \
    -v ${ABSOLUTE_PROJECT_PATH}:/projects/pages-gen \
    -v ${ABSOLUTE_PROJECT_PATH}/data/buckets:/data/pages-gen/buckets \
    \
    -e AWS_ACCESS_KEY_ID=S3RVER \
    -e AWS_SECRET_ACCESS_KEY=S3RVER \
    -e REGION=eu-west-1 \
    -e SQS_ENDPOINT=http://sqs:9324 \
    -e DB_ENDPOINT=http://dynamodb:8000 \
    -e S3_ENDPOINT=http://localhost:4569 \
    \
    -w /projects/pages-gen \
    -p 744:3000 \
    -p 745:4569 \
    --network="verisure" \
    --name="pages-gen-serverless" \
    node:16 npm run dev
