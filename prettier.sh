#!/bin/bash

if [[ $# -eq 0 ]] ; then
    echo "You need to specify the target file pattern as the first argument"
    exit 1
fi

./node_modules/.bin/prettier --write $1