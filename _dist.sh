#! /bin/sh
pier_path=$1
desk_name=$(cat ./desk)
desk_path="$pier_path/$desk_name"

echo "Copying desk from project to distributor pier..."
rsync -aR --delete ./deps/./ ./src/./ $desk_path