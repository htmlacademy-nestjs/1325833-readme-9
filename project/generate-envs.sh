#!/bin/bash

# Переход в apps
cd "$(dirname "$0")/apps" || exit 1

# Проход по всем подпапкам в apps/
for dir in */ ; do
  folder_name="${dir%/}"
  env_example_path="$folder_name/.env-example"
  target_env="$folder_name/${folder_name}.env"

  if [[ -f "$env_example_path" ]]; then
    if [[ ! -f "$target_env" ]]; then
      cp "$env_example_path" "$target_env"
      echo "✅ Created $target_env"
    else
      echo "⚠️  $target_env already exists — skipped"
    fi
  else
    echo "❌ No .env-example in $folder_name — skipped"
  fi
done
