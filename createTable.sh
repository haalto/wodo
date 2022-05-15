#!/bin/bash

echo "Creating table MeasurementTable"

aws dynamodb update-table \
   --table-name MeasurementTable \
   --attribute-definitions AttributeName=id,AttributeType=S AttributeName=sk,AttributeType=S \
   --key-schema AttributeName=id,KeyType=HASH AttributeName=sk,KeyType=RANGE \
   --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
   --global-secondary-indexes \
        "[
            {
                \"IndexName\": \"MeasurementEmailIndex\",
                \"KeySchema\": [{\"AttributeName\":\"Email\",\"KeyType\":\"key\"},
                \"Projection\":{
                    \"ProjectionType\":\"INCLUDE\",
                    \"NonKeyAttributes\":[\"UserId\"]
                },
                \"ProvisionedThroughput\": {
                    \"ReadCapacityUnits\": 1,
                    \"WriteCapacityUnits\": 1
                }
            }
        ]"
   --endpoint-url http://localhost:8000

aws dynamodb list-tables --endpoint-url http://localhost:8000