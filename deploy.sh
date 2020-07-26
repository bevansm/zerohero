#!/bin/bash
export APP_NAME=zerohero
export CLUSTER_NAME=bots
export AWS_BASE_URL=$(aws sts get-caller-identity | jq -r .Account ).dkr.ecr.$(aws configure get region --profile default).amazonaws.com
aws ecr get-login-password --region $(aws configure get region --profile default) | \
    docker login --username AWS --password-stdin $AWS_BASE_URL
docker build . -t $AWS_BASE_URL/$APP_NAME
docker push $AWS_BASE_URL/$APP_NAME
aws ecs update-service --cluster $CLUSTER_NAME --service $APP_NAME --force-new-deployment