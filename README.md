# ARTIFEX-GALLERY (generated from project report)

This repository contains a minimal full-stack implementation based on the "ARTIFEX GALLERY - THE ART OF ALGORITHM" project report.

## Structure

- backend/: Express server that:
  - generates images (via OpenAI Images endpoint)
  - builds NFT metadata
  - uploads image + metadata to IPFS using Pinata (if PINATA_JWT set)
  - exposes POST /generate-nft

- frontend/: Next.js minimal app with a single form (components/NFTForm.jsx) to call backend

## Quickstart (local)

### Backend
1. `cd backend`
2. `cp .env.example .env` and fill keys (DALLE_API_KEY, PINATA_JWT)
3. `npm install`
4. `npm run dev`
Backend runs on port 3000 by default.

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`
4. Open http://localhost:3000

Notes:
- If you don't set DALLE_API_KEY or PINATA_JWT, the backend will return placeholder URLs so you can still test the flow locally.
- This is a starter scaffold created from your project report. You can expand each module later.

