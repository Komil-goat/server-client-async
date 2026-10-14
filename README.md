# 🎓 Transcript Management System — Async Server + Client

> A lightweight, async TypeScript demo with an **Express REST API** and a vanilla **HTML + TypeScript dashboard** for managing students, transcripts, and course grades.

![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-black?logo=express&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

---

## ✨ 

**Server (`TranscriptServer`)**

- 📋 `GET /transcripts` — list all transcripts
- ➕ `POST /transcripts` — add a student (`{ "name": "..." }` → `{ "studentID": N }`)
- 🔍 `GET /transcripts/:id` — get one transcript
- 🗑️ `DELETE /transcripts/:id` — delete a student
- 🎓 `POST /transcripts/:studentID/:course` — add a grade (`{ "grade": 95 }`)
- 📊 `GET /transcripts/:studentID/:course` — get a grade
- 🆔 `GET /studentids[?name=...]` — list student IDs, optionally filtered by name
- 💾 In-memory store with seed data, CORS enabled, JSON body parsing

**Client (`TranscriptClient`)**

- 🖥️ Clean Tailwind dashboard (via CDN, no build step for CSS)
- ⚡ Async `axios`-based service layer (`remoteService.ts` → `dataService.ts` → `index.ts`)
- 🔘 One-click actions: fetch transcripts, fetch IDs, add/delete student, add/get course grade
- 📦 Zero bundler — compiles with `tsc` and runs as native ES modules in the browser

---

## 🧰 Tech Stack

| Layer  | Technology                          |
| ------ | ----------------------------------- |
| Server | Node.js, Express 5, TypeScript, CORS |
| Client | TypeScript, Axios (CDN), Tailwind (CDN), `serve` |
| Tools  | `tsc`, npm, Git                     |

---

## 📁 Project Structure

```text
server-client-async/
├── README.md
├── LICENSE
├── .gitignore
│
├── TranscriptServer/
│   ├── package.json        # start: tsc && node dist/index.js
│   ├── tsconfig.json       # rootDir: src → outDir: dist
│   └── src/
│       ├── index.ts            # Express app, routes, port 4001
│       └── transcriptManager.ts # In-memory DB + business logic
│
└── TranscriptClient/
    ├── package.json        # start: tsc && serve .
    ├── tsconfig.json       # ES2024 / ESNext / bundler resolution
    ├── index.html          # Dashboard UI (loads dist/index.js as module)
    └── src/
        ├── index.ts        # DOM wiring + button handlers
        ├── dataService.ts  # Typed API wrappers
        └── remoteService.ts # axios GET/POST/DELETE, baseUrl
```

> `node_modules/`, `dist/`, and OS files (`.DS_Store`) are git-ignored — they are rebuilt locally with `npm install` / `tsc`.

---

## ✅ Prerequisites

- **Node.js 18+** and **npm** (check with `node --version` / `npm --version`)
- A modern browser (Chrome / Edge / Firefox / Safari)
- Git (for cloning / publishing)

---

## 🚀 Quick Start — How to Run

> Run the **server first**, then the **client** in a second terminal. No source-code changes needed.

### 1️⃣ Clone (after you push to GitHub)

```bash
git clone https://github.com/Komil-goat/server-client-async.git
cd <server-client-async>
```

### 2️⃣ Start the server — http://localhost:4001

```bash
cd TranscriptServer
npm install
npm start
```

`npm start` runs `tsc && node dist/index.js`. You should see:

```text
Express server now listening on localhost:4001
Initial list of transcripts:
[...]
```

Quick smoke test (new terminal):

```bash
curl http://localhost:4001/transcripts
curl "http://localhost:4001/studentids"
```

### 3️⃣ Start the client — http://localhost:3000

In a **second terminal**:

```bash
cd TranscriptClient
npm install
npm start
```

`npm start` runs `tsc && serve .`. Open the URL that `serve` prints (default **http://localhost:3000**) and use the dashboard:

1. **Get Transcripts** / **Get Student IDs** — fills the left panels
2. **Add Student** — type a name → *Post Transcript* (returns an ID in the server log)
3. **Manage Student Record** — enter an ID → *Get* / *Delete Transcript*
4. **Course Operations** — enter course + student ID + grade → *Post Course* / *Get Course*

> The client talks to `http://localhost:4001/` (see `TranscriptClient/src/remoteService.ts` → `resolveUrl`). Keep the server running, and allow the browser to reach `localhost`.

### 4️⃣ Stop

Press `Ctrl+C` in each terminal.

---

## 🔌 API Reference

Base URL: `http://localhost:4001`

| Method | Endpoint                              | Body / Query                  | Success        | Notes                              |
| ------ | ------------------------------------- | ----------------------------- | -------------- | ---------------------------------- |
| GET    | `/transcripts`                        | —                             | `200` + JSON[] | List all                           |
| POST   | `/transcripts`                        | `{ "name": "Alice" }`         | `201` + `{ studentID }` | Create student            |
| GET    | `/transcripts/:id`                    | —                             | `200` / `404`  | Single transcript                  |
| DELETE | `/transcripts/:id`                    | —                             | `204` / `404`  | Delete student                     |
| GET    | `/studentids`                         | `?name=Jasur` (optional)      | `200` + `number[]` | All IDs or filtered by name   |
| POST   | `/transcripts/:studentID/:course`     | `{ "grade": 90 }`             | `201` / `400`  | Fails if grade already exists      |
| GET    | `/transcripts/:studentID/:course`     | —                             | `200` / `400`  | `{ studentID, course, grade }`     |

Example:

```bash
# create a student
curl -X POST http://localhost:4001/transcripts \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice"}'
# → {"studentID":5}

# add a grade
curl -X POST http://localhost:4001/transcripts/5/math \
  -H "Content-Type: application/json" \
  -d '{"grade":95}'
# → 201

# read it back
curl http://localhost:4001/transcripts/5/math
# → {"studentID":5,"course":"math","grade":95}
```

Seed data on boot (`transcriptManager.ts` → `initialize()`): `Sardor`, `Jasur`, `Jasur`, `Nigora` → IDs 1–4.

---

## ⚙️ Configuration

| What | Where | Default |
| ---- | ----- | ------- |
| Server port | `TranscriptServer/src/index.ts` → `PORT` | `4001` |
| Client → server URL | `TranscriptClient/src/remoteService.ts` → `baseUrl` | `http://localhost:4001/` |
| Client static port | `serve .` CLI output | `3000` |
| TS out dirs | each `tsconfig.json` (`outDir: dist`) | `dist/` (git-ignored) |

---

## 🧪 Scripts

```bash
# server
cd TranscriptServer
npm install   # install deps
npm start     # tsc && node dist/index.js

# client
cd TranscriptClient
npm install   # install deps (incl. `serve`)
npm start     # tsc && serve .
```

To rebuild without starting:

```bash
npx tsc        # inside either TranscriptServer/ or TranscriptClient/
```

---

## ☁️ Publish to GitHub (maintainer checklist)

This repo is already cleaned: `node_modules/`, `dist/`, `.DS_Store` removed and covered by `.gitignore`.

```bash
# from the project root (server-client-async/)
git init -b main
git add .
git commit -m "chore: prepare public release (README, .gitignore, LICENSE)"
gh repo create <your-repo> --public --source=. --push
# ...or without gh CLI:
# git remote add origin https://github.com/Komil-goat/server-client-async.git
# git push -u origin main
```

Then on GitHub: repo **Settings** → confirm **Public** visibility, add a description + topics (`typescript`, `express`, `rest-api`, `async`, `tailwind`).

---

## 🤝 Contributing

Issues and PRs are welcome! This is a learning demo — small, focused PRs (bug fixes, docs, extra endpoints) are ideal. Please keep the UI dependency-free (CDN-only) unless discussed first.

---

## 📄 License

MIT — see [LICENSE](./LICENSE). Free for personal, academic, and commercial use.

---

<p align="center">Built with TypeScript + Express + a tiny bit of Tailwind ✨</p>
```

