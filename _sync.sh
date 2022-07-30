#! /bin/sh
pier_path=$1
desk_name=$(cat ./desk_name)
desk_path="$pier_path/$desk_name"

while :
do
    rsync -avz ./base/* $desk_path
    rsync -avz ./src/* $desk_path
    sleep 3
done