#!/bin/bash

set -e

temp_file=$(mktemp)
error_messages=""

cd server/ || error_messages+="Failed to change directory to 'server/'"$'\n'
printf "running server/ruff...\n"
poetry run ruff format . >$temp_file 2>&1 || error_messages+="ruff command failed:\n$(cat $temp_file)"$'\n'
poetry run ruff check . --fix >$temp_file 2>&1 || error_messages+="ruff command failed:\n$(cat $temp_file)"$'\n'
printf "exporting latest graphql schema\n"
poetry run python manage.py export_schema gifts.schema > ../schema.graphql
cd ..

cd client/ || error_messages+="Failed to change directory to 'client/'"$'\n'
printf "running client/prettier...\n"
yarn run prettier . --write >$temp_file 2>&1 || error_messages+="prettier command failed:\n$(cat $temp_file)"$'\n'
printf "running client/npx-lint...\n"
yarn run lint --fix >$temp_file 2>&1 || error_messages+="lint command failed:\n$(cat $temp_file)"$'\n'
printf "running client/tsc-validate...\n"
yarn run tsc-validate >$temp_file 2>&1 || error_messages+="tsc-validate command failed:\n$(cat $temp_file)"$'\n'

rm $temp_file

if [ -n "$error_messages" ]; then
    # print in red
    printf "\033[31m%s\033[0m\n" "$error_messages"
    exit 1
else
    # print in green
    printf "\033[32m%s\033[0m\n" "All scripts ran successfully."
fi
