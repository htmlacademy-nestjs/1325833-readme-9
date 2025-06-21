#!/bin/bash

set -e

PRISMA_DIR="libs/blog/models"

echo "📦 Go to $PRISMA_DIR"
cd "$PRISMA_DIR" || { echo "❌ Can't find $PRISMA_DIR"; exit 1; }

echo "🔧 Generate Prisma client..."
npx prisma generate

echo "🧱 Apply migration (init)..."
npx prisma migrate dev --name init

echo "✅ Prisma done!"
