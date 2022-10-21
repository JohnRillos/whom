#! /bin/sh
pier_path=$1
desk_name=$(cat ./build_desk)
desk_path="$pier_path/$desk_name"

echo "Copying build desk from project to distributor pier..."
cp -r .build $desk_path