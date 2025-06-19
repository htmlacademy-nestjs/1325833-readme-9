#!/bin/bash

services=(
  "api-gateway"
  "account"
  "files-storage"
  "blog"
  "notify"
)

for service in "${services[@]}"; do
  echo "🧨 Open terminal for $service..."
  osascript <<EOF
tell application "Terminal"
  do script "cd \"$(pwd)\"; nx run $service:serve"
end tell
EOF
done

echo "✅ All services are started"
