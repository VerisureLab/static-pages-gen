#!/bin/sh

AWS_ENDPOINT_URL=${AWS_ENDPOINT_URL:-http://localhost:8000}

# Pages_Source

aws dynamodb \
  --endpoint-url ${AWS_ENDPOINT_URL} delete-table \
  --table-name Pages_Source

sleep 1

aws dynamodb \
  --endpoint-url ${AWS_ENDPOINT_URL} create-table \
  --table-name Pages_Source \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --stream-specification StreamEnabled=true,StreamViewType=NEW_AND_OLD_IMAGES

# Pages_Creativity

sleep 1

aws dynamodb \
  --endpoint-url ${AWS_ENDPOINT_URL} delete-table \
  --table-name Pages_Creativity

sleep 1

aws dynamodb \
  --endpoint-url ${AWS_ENDPOINT_URL} create-table \
  --table-name Pages_Creativity \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --stream-specification StreamEnabled=true,StreamViewType=NEW_AND_OLD_IMAGES

sleep 1

aws dynamodb --endpoint-url ${AWS_ENDPOINT_URL} update-table \
  --table-name Pages_Creativity \
  --attribute-definitions AttributeName=slug,AttributeType=S \
  --global-secondary-index-updates \
  "[
    {
      \"Create\": {
        \"IndexName\": \"slug-index\",
        \"KeySchema\": [
          {
            \"AttributeName\":\"slug\",
            \"KeyType\":\"HASH\"
          }
        ],
        \"ProvisionedThroughput\": {
          \"ReadCapacityUnits\": 1,
          \"WriteCapacityUnits\": 1
        },
        \"Projection\": {
          \"ProjectionType\":\"ALL\"
        }
      }
    }
  ]"

# Pages_Page

sleep 1

aws dynamodb \
  --endpoint-url ${AWS_ENDPOINT_URL} delete-table \
  --table-name Pages_Page

sleep 1

aws dynamodb \
  --endpoint-url ${AWS_ENDPOINT_URL} create-table \
  --table-name Pages_Page \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --stream-specification StreamEnabled=true,StreamViewType=NEW_AND_OLD_IMAGES

sleep 1

aws dynamodb --endpoint-url ${AWS_ENDPOINT_URL} update-table \
  --table-name Pages_Page \
  --attribute-definitions AttributeName=slug,AttributeType=S \
  --global-secondary-index-updates \
  "[
    {
      \"Create\": {
        \"IndexName\": \"slug-index\",
        \"KeySchema\": [
          {
            \"AttributeName\":\"slug\",
            \"KeyType\":\"HASH\"
          }
        ],
        \"ProvisionedThroughput\": {
          \"ReadCapacityUnits\": 1,
          \"WriteCapacityUnits\": 1
        },
        \"Projection\": {
          \"ProjectionType\":\"ALL\"
        }
      }
    }
  ]"

sleep 1

aws dynamodb \
  --endpoint-url ${AWS_ENDPOINT_URL} delete-table \
  --table-name Attributes

sleep 1

aws dynamodb \
  --endpoint-url ${AWS_ENDPOINT_URL} create-table \
  --table-name Attributes \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --stream-specification StreamEnabled=true,StreamViewType=NEW_AND_OLD_IMAGES