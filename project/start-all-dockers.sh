#!/bin/bash

set -e

services=("account" "blog" "files-storage" "notify")

for name in "${services[@]}"; do
  echo "🚀 Starting $name..."

  docker compose \
    --file "./apps/$name/docker-compose.dev.yml" \
    --project-name "readme-$name" \
    --env-file "./apps/$name/$name.env" \
    up -d
done

echo "✅ All services started"
