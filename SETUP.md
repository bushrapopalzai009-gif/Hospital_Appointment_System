# Carepoint setup and run guide

## What you need

- Windows 10 or 11.
- Node.js LTS (npm is included with Node.js): https://nodejs.org/
- MongoDB Community Server running locally, or a MongoDB Atlas connection string.

The frontend and backend dependencies are listed in `client/package.json` and `server/package.json`. This is a Node/MERN project, so it uses npm package manifests rather than a Python `requirements.txt` file.

## Easiest way: double-click to start

1. Install Node.js LTS and MongoDB.
2. If MongoDB Community Server is installed as a Windows service, make sure the MongoDB service is running. For Atlas, put your connection string in `server/.env` as `MONGO_URI=...`.
3. Double-click **`run.bat`** in the repository folder.
4. The first run automatically installs root, server, and client dependencies and creates `server/.env` with a fresh development JWT secret.
5. The launcher starts both backend and frontend in one terminal window and opens `http://localhost:5173` in your browser.
6. Close the Carepoint terminal window to stop both services.

Use **`setup.bat`** by itself if you only want to install dependencies. After setup, use `run.bat` whenever you want to start the app.

## Manual commands

Open a terminal in the repository directory and run:

```bash
npm install
npm install --prefix server
npm install --prefix client
```

Copy `server/.env.example` to `server/.env`, then set `MONGO_URI` and a long random `JWT_SECRET`. Start the API and frontend together:

```bash
npm run dev
```

The React app runs at `http://localhost:5173`; the Express API runs at `http://localhost:5000`.

To load sample development users, doctors, and departments:

```bash
npm run seed --prefix server
```

All seeded demo users use `Carepoint2026!`. Demo accounts are listed in `README.md`.

## Troubleshooting

- **`node` or `npm` not recognized:** install Node.js LTS, close and reopen the terminal, and retry.
- **API reports MongoDB connection failed:** start MongoDB locally or set a valid Atlas URI in `server/.env`.
- **Port already in use:** stop the other app using port 5000 or 5173, or update `PORT` and the Vite proxy configuration.
- **Dependencies fail to install:** check your internet connection, then rerun `setup.bat`.
- **The browser opens before the API is ready:** wait a few seconds and refresh. The app uses `/api` requests proxied to port 5000.

This launcher is for local development. Before deployment, use production secrets and configure hosting, database access, and email/SMS integrations separately.
