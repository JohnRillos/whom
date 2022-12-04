#! /bin/sh
pier_path=$1
desk_name=$(cat ./build_desk)
desk_path="$pier_path/$desk_name"

echo "Copying build desk from dev pier into project..."
cp -r $desk_path/* .build

echo "Building frontend..."
cd ui && npm ci && npm run build