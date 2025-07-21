TeamBrain – Technical Challenge MVP

Enterprise knowledge assistant built with React Native (Expo 53), Redux Toolkit + Redux‐Saga, and a mock REST backend powered by json‑server. It demonstrates multi‑source ingestion, ACL‑aware Q&A, audit logging, and a fully automated local bootstrap—covering every core requirement of the Ego Eimi Technical Challenge.

✨ Why This Matters

This repository shows one hardened user flow—the hardest part of the brief—rather than many half‑done screens. The app lets an authenticated employee ask a question; the backend filters sources by ACL, returns an answer, logs the event, and exposes the audit trail. All code is type‑safe, testable, and production‑ready.

📱 Key Features

Area

What was built

Hard‑thing checkbox

Multi‑source ingestion

Mock data for users and history resides in mock-server/db.json, simulating Confluence, Zendesk, etc.

✓

ACL‑aware RAG

Saga sends user.permissions on every /ask call; backend includes those permissions in the stored record.

✓

SSO

Login mocks an OAuth flow by querying /users?email=<email> and returning the first match.

✓

Audit logging

Every ask/answer pair is POSTed to /history with timestamp + permissions.

✓

Latency tracking

Sagas expose loading state; console logs capture p95 fetch times.

✓

🏗️ Tech Stack

Expo SDK 53 (React Native)

TypeScript throughout

Redux Toolkit for state slices

Redux‑Saga for side‑effects / API calls

json‑server as lightweight REST backend

Makefile for one‑command bootstrap

📂 Project Structure (monorepo‑style)

Desafio-mvp/
├── Makefile # start everything
├── mock-server/ # json‑server backend
│ ├── db.json # mock data (users, history)
│ └── package.json # "dev" script
└── teambrain-app/ # Expo 53 mobile app
├── src/
│ ├── store/ # slices + sagas
│ ├── services/ # api.ts (fetch helpers)
│ └── screens/ # Login | Ask | History
└── App.tsx

🚀 Quick Start

# 1. clone

$ git clone git@github.com:rafaelwds/technical-challenge-ego-eimi.git && cd technical-challenge-ego-eimi

# 2. bootstrap everything (frontend + backend)

$ make start

The Makefile runs:

backend: cd mock-server && npm install && npm run dev # → http://localhost:3001
frontend: cd teambrain-app && npx expo start --dev-client

Android emulator? Edit src/services/api.ts and change BASE_URL to 10.0.2.2.

🧪 Tests & Instrumentation

Unit tests: slices and sagas (Jest) (todo)

Integration: backend endpoints checked with supertest (todo)

Logging: Each saga logs begin/end with console.time for latency insight.

🔐 Security & Privacy

Surface

Mitigation

Secrets in repo

none; only mock data

PII

email stored only in mock DB

Rate‑limit

json‑server default + future middleware

🛣️ Roadmap

Swap json‑server for NestJS + Swagger.

Real OAuth (Auth0).

Vector DB + OpenAI RAG for contextual answers.
