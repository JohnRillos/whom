#! /bin/sh
pier_path=$1
desk_name=$(cat ./desk)
desk_path="$pier_path/$desk_name"

while :
do
    rsync -aRz ./deps/./* ./src/./* $desk_path --delete
    sleep 3
done