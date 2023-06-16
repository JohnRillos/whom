#! /bin/sh
echo "Building frontend..."
cd ui && npm ci && npm run build
cd ..