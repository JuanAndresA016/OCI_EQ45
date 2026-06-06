#!/bin/bash

SCRIPT_DIR=$(pwd)

if [ -z "$DOCKER_REGISTRY" ]; then
    echo "Error: DOCKER_REGISTRY env variable needs to be set!"
    exit 1
fi

echo "Creating MazeTasks backend deployment and service"

export CURRENTTIME=$(date '+%F_%H-%M-%S')

cp src/main/resources/mazetasks-backend.yaml mazetasks-backend-$CURRENTTIME.yaml

sed -i "s|%DOCKER_REGISTRY%|${DOCKER_REGISTRY}|g" mazetasks-backend-$CURRENTTIME.yaml

echo "Generated deployment file:"
ls -l mazetasks-backend-$CURRENTTIME.yaml
