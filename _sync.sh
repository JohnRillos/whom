#! /bin/sh
pier_path=$1
desk_name=$(cat ./desk_name)
desk_path="$pier_path/$desk_name"

while :
do
    rsync -aqz ./base/* $desk_path
    rsync -aqz ./src/* $desk_path
    sleep 3
done