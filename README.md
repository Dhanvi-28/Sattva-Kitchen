# Project Architecture

Full-stack scaffold: **React (Vite)** frontend, **Express** backend, **MongoDB Atlas** database.
This is architecture only — no pages/features are implemented yet.

## Folder structure

```
project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── env.js          # centralized, validated env access
│   │   │   └── db.js           # MongoDB Atlas connection (mongoose)
│   │   ├── controllers/        # empty — feature controllers go here
│   │   ├── models/             # empty — mongoose schemas go here
│   │   ├── routes/
│   │   │   └── index.js        # central router (health check only)
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   └── notFound.js
│   │   ├── utils/
│   │   │   ├── logger.js
│   │   │   ├── ApiError.js
│   │   │   ├── ApiResponse.js
│   │   │   └── asyncHandler.js
│   │   ├── app.js              # express app: middleware + route mounting
│   │   └── server.js           # entrypoint: connects DB, starts server
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/         # Button, Loader, ErrorMessage, ErrorBoundary
│   │   │   └── layout/         # Header, Footer, Layout (app shell)
│   │   ├── context/
│   │   │   └── AppContext.jsx  # app-wide state (user, theme)
│   │   ├── hooks/
│   │   │   └── useFetch.js     # generic data-fetching hook
│   │   ├── services/
│   │   │   └── api.js          # shared axios instance
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   ├── routes/
│   │   │   └── index.jsx       # router registry — currently zero routes
│   │   ├── styles/
│   │   │   └── globals.css     # shared design tokens
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── package.json                 # npm workspaces root
└── .gitignore
```

## Component architecture

- **`components/common/`** — presentation primitives with no business logic (`Button`, `Loader`, `ErrorMessage`, `ErrorBoundary`). Feature/page components compose these rather than styling raw elements.
- **`components/layout/`** — structural shell (`Header`, `Footer`, `Layout`). `Layout` wraps every route.
- **`context/`** — cross-cutting state only (auth user, theme). Page-local state stays in the page component.
- **`hooks/`** — reusable stateful logic (e.g. `useFetch`), decoupled from any specific page.
- **`services/`** — one shared `api.js` axios instance (auth header + error normalization via interceptors). Feature services (e.g. `userService.js`) will import this instead of creating their own client.
- **`routes/index.jsx`** — single source of truth for the router. Currently has no routes registered; pages get added here.

## Backend architecture

- **`config/`** — `env.js` validates required environment variables at boot and exports a single typed-ish config object; `db.js` owns the MongoDB Atlas connection lifecycle (connect/disconnect, event logging).
- **`middleware/`** — `notFound` + `errorHandler` are mounted last in `app.js` and handle all 404s / thrown errors centrally.
- **`utils/`** — `ApiError` (throwable HTTP errors), `ApiResponse` (consistent success envelope), `asyncHandler` (wraps async route handlers so rejections reach `errorHandler`), `logger`.
- **`routes/index.js`** — central router mounted at `/api/v1`. Only a `/health` check exists; feature routers get added here.
- **`controllers/`, `models/`** — empty, ready for feature implementation.

## MongoDB Atlas setup

1. Create a free/shared or dedicated cluster at [cloud.mongodb.com](https://cloud.mongodb.com).
2. Under **Database Access**, create a database user with a strong password.
3. Under **Network Access**, add your IP (or `0.0.0.0/0` for local dev only — restrict in production).
4. Under **Database > Connect > Drivers**, copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@<cluster-url>/<db-name>?retryWrites=true&w=majority&appName=<app-name>
   ```
5. Paste it into `backend/.env` as `MONGODB_URI` (see below).

## Environment variables

Copy each example file and fill in real values — **never commit `.env` files**.

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

**`backend/.env`**
| Variable | Purpose |
|---|---|
| `NODE_ENV` | `development` \| `production` |
| `PORT` | Backend server port (default `5000`) |
| `CLIENT_ORIGIN` | Frontend URL, for CORS |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Placeholder for future auth |
| `JWT_EXPIRES_IN` | Placeholder for future auth |

**`frontend/.env`**
| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Base URL the frontend calls (`http://localhost:5000/api/v1`) |
| `VITE_APP_NAME` | Display name used in Header/Footer |

## Getting started

```bash
# from the project root
npm install            # installs both workspaces
npm run dev             # runs backend + frontend concurrently
```

Or individually:
```bash
cd backend && npm install && npm run dev
cd frontend && npm install && npm run dev
```

Backend health check: `GET http://localhost:5000/api/v1/health`

## What's intentionally NOT here

No pages, no feature routes, no mongoose schemas, no auth flows, no UI content beyond the app shell. This is scaffolding only — build features on top of it.
