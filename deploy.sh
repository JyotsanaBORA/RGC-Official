#!/bin/bash
set -e
cd "$(dirname "$0")"

echo ""
echo "=== Reddington Global — Auto Deploy ==="

echo ""
echo "[1/4] Pulling latest code..."
git pull

echo ""
echo "[2/4] Installing dependencies..."
npm install

echo ""
echo "[3/4] Building production bundle..."
npm run build

echo ""
echo "[4/4] Deploy complete."
echo "Run 'npm start' or restart PM2 to serve the new build."
echo ""
