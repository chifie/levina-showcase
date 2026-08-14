#!/usr/bin/env bash
# Captures and optimizes the project screenshots used on the portfolio cards.
#
# Requirements: Chrome/Chromium, Node 22+ (built-in WebSocket), ImageMagick.
#
# Usage:
#   ./scripts/capture-screenshots.sh            # external live sites only
#   ./scripts/capture-screenshots.sh --local    # also recapture this portfolio from the dev server
#
# External screenshots are captured directly from their live deployments;
# the local portfolio shots need `npm run dev` running on port 8080.
set -euo pipefail

CDP_PORT="${CDP_PORT:-9222}"
DEV_PORT="${DEV_PORT:-8080}"
LOCAL="${1:-}"
OUT_DIR="public/screenshots"
PROFILE="$(mktemp -d)"
mkdir -p "$OUT_DIR"

cleanup() {
  pkill -f "remote-debugging-port=$CDP_PORT" 2>/dev/null || true
  pkill -f "vite dev" 2>/dev/null || true
}
trap cleanup EXIT

echo "starting headless chrome on port $CDP_PORT..."
google-chrome --headless=new --no-sandbox --disable-gpu \
  --remote-debugging-port="$CDP_PORT" --user-data-dir="$PROFILE" \
  --window-size=1280,900 about:blank > /dev/null 2>&1 &
sleep 3

capture() { # capture <name> <url> [mobile]
  local name="$1" url="$2" mobile="${3:-}"
  if [ "$mobile" = "mobile" ]; then
    node scripts/cdp-shot-mobile.mjs "http://127.0.0.1:$CDP_PORT" "$url" "/tmp/$name.png" 15000
    magick "/tmp/$name.png" -crop 780x1580+0+0 +repage -resize 390x790 -quality 82 "$OUT_DIR/$name.webp"
  else
    node scripts/cdp-shot.mjs "http://127.0.0.1:$CDP_PORT" "$url" "/tmp/$name.png"
    magick "/tmp/$name.png" -crop 1280x720+0+0 +repage -resize 800x450 -quality 82 "$OUT_DIR/$name.webp"
  fi
  echo "captured $OUT_DIR/$name.webp"
}

# Live external deployments — update URLs as deployments change.
capture soko-digital "https://soko-digital-frontend.vercel.app"
capture dalali-mkononi "https://dalali-mkononi.vercel.app"
capture dalali-mkononi-mobile "https://dalali-mkononi.vercel.app" mobile
capture glory-burger "https://gloryburger.com"
capture glory-burger-mobile "https://gloryburger.com" mobile

if [ "$LOCAL" = "--local" ]; then
  echo "capturing the local portfolio (dev server on port $DEV_PORT)..."
  npm run dev > /dev/null 2>&1 &
  sleep 6
  capture portfolio-website "http://localhost:$DEV_PORT"
  capture portfolio-mobile "http://localhost:$DEV_PORT" mobile
fi

echo "done"
