#! /bin/sh
pier_path=$1
desk_name=$(cat ./dev_desk)
desk_path="$pier_path/$desk_name"

while :
do
    rsync -az ./deps/* $desk_path
    rsync -az ./src/* $desk_path
    sleep 3
done