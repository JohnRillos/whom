#! /bin/sh
project_path=$(pwd)
if [ -n "$1" ]; then
    urbit_repo_path=$1
else
    git clone --filter blob:none git@github.com:urbit/urbit.git .urbit
    urbit_repo_path=.urbit
fi

cd $urbit_repo_path/pkg
./symbolic-merge.sh base-dev base
./symbolic-merge.sh garden-dev base

cd $project_path
cp -rL $urbit_repo_path/pkg/base base
