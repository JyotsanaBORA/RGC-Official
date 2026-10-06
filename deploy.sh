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
echo "[4/4] Restarting application..."
if command -v pm2 &> /dev/null; then
  if pm2 list | grep -q "online"; then
    echo "Reloading running PM2 process(es)..."
    pm2 reload all --update-env || pm2 restart all --update-env
  else
    echo "Starting app with PM2..."
    pm2 start npm --name "reddington-website" -- start
  fi
  echo "PM2 reload complete."
else
  echo "PM2 not detected. Run 'npm start' to serve the new build."
fi

echo ""
echo "=== Deploy Complete ==="
echo ""
