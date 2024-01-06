#!/bin/bash

set -e

temp_file=$(mktemp)
error_messages=""

cd server/ || error_messages+="Failed to change directory to 'server/'"$'\n'
printf "running server/ruff...\n"
poetry run ruff format . >$temp_file 2>&1 || error_messages+="ruff command failed:\n$(cat $temp_file)"$'\n'
poetry run ruff check . --fix >$temp_file 2>&1 || error_messages+="ruff command failed:\n$(cat $temp_file)"$'\n'
cd ..
printf "exporting latest graphql schema\n"
bash ./scripts/graphql-schema-gen.sh

cd client/ || error_messages+="Failed to change directory to 'client/'"$'\n'
printf "running client/biome...\n"
yarn run format >$temp_file 2>&1 || error_messages+="prettier command failed:\n$(cat $temp_file)"$'\n'
printf "running client/tsc...\n"
yarn run tsc >$temp_file 2>&1 || error_messages+="tsc-validate command failed:\n$(cat $temp_file)"$'\n'

rm $temp_file

if [ -n "$error_messages" ]; then
    # print in red
    printf "\033[31m%s\033[0m\n" "$error_messages"
    exit 1
else
    # print in green
    printf "\033[32m%s\033[0m\n" "All scripts ran successfully."
fi
