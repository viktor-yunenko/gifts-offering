#!/bin/bash

set -e

# confirm that we're in the git root, not /scripts or /server
if [ ! -d ".git" ]; then
  echo "Please run this script from the root of the git repo"
  exit 1
fi

echo "running django codegen..."
cd server || exit
poetry run python manage.py export_schema gifts.schema > ../client/graphql/schema.graphql
# print in green
printf "\033[32m%s\033[0m\n" "created django schema.graphql"

echo "running apollo codegen..."
cd ../client || exit

npx graphql-codegen --require dotenv/config --config "src/codegen.ts"

printf "\033[32m%s\033[0m\n" "created apollo tsx files"
