#!/bin/bash

set -e

PRISMA_DIR="libs/blog/models"

echo "📦 Go to $PRISMA_DIR"
cd "$PRISMA_DIR" || { echo "❌ Can't find $PRISMA_DIR"; exit 1; }

echo "💣 Drop DB..."
npx prisma migrate reset

echo "✅ DB dropped"
