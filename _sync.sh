#! /bin/sh
pier_path=$1
desk_name=$(cat ./desk)
desk_path="$pier_path/$desk_name"

while :
do
    rsync -aR --delete ./deps/./ ./src/./ $desk_path
    sleep 3
done