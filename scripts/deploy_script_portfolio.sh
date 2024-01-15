#!/bin/bash

set -e

CONTAINER_NAME="portfolio-front"
IMAGE_NAME="krahristov/portfolio-frontend:latest"
APP_DIR="$HOME/portfolio-frontend"

echo "Starting deployment..."

echo "Pulling the Docker image..."
sudo docker pull $IMAGE_NAME

echo "Stopping the existing Docker container..."
sudo docker stop $CONTAINER_NAME || true
sudo docker rm $CONTAINER_NAME || true

echo "Running the new Docker container..."
sudo docker run -p 9090:9090 -d --name $CONTAINER_NAME $IMAGE_NAME

echo "Removing unused Docker images..."
sudo docker image prune -af

echo "Deployment successful!"