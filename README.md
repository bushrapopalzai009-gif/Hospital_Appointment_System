# Carepoint Hospital Appointment System

> Last updated: 2026-09-30

A full-stack appointment platform built with MongoDB, Express, React, and Node.js. It includes patient and doctor authentication, public doctor discovery, scheduling, appointment management, notifications, and role-aware dashboards.

## Features

- JWT authentication, bcrypt password hashing, and patient/doctor/admin role checks.
- Doctor search by name and specialty, profiles, office hours, breaks, and generated appointment slots.
- Three-step booking with backend availability checks, past-date checks, and collision protection through a unique MongoDB slot key.
- Appointment confirmation, cancellation, rescheduling, and completion actions with user notifications.
- Patient, doctor, and admin dashboards; doctor availability editor; basic admin user and appointment statistics.
- Responsive public pages, forms, helpful empty/error states, and seeded development accounts.

## Technology

- Client: React 18, React Router, Axios, Lucide, Vite.
- API: Node.js, Express, Mongoose, Zod, JWT, bcryptjs, Helmet, rate limiting.
- Database: MongoDB.

## Project structure

```text
client/                 React application
  src/App.jsx           Public site, doctor discovery, profiles, booking, auth
  src/pages.jsx         About/contact pages and role dashboards
  src/styles.css        Responsive design system
server/                 Express API
  models/index.js       Mongoose models and indexes
  routes/api.js         REST endpoints and booking rules
  middleware/auth.js    JWT authentication and role checks
  seed.js               Development account and sample data seed
```

## Requirements

- Node.js 20 or newer and npm.
- A local MongoDB service or a MongoDB Atlas connection string.

## Setup

For Windows users, the easiest option is to double-click [`run.bat`](run.bat). It installs dependencies on first use, creates the local API environment file, starts the API and frontend, and opens the app. See [SETUP.md](SETUP.md) for prerequisites and troubleshooting.

1. Configure the API environment:

   ```powershell
   Copy-Item server/.env.example server/.env
   ```

   Set `MONGO_URI` and a long random `JWT_SECRET` in `server/.env`. `CLIENT_URL` should match the Vite URL (default `http://localhost:5173`).

2. Install dependencies:

   ```bash
   npm install
   npm install --prefix server
   npm install --prefix client
   ```

3. Seed sample doctors, departments, and demo users:

   ```bash
   npm run seed --prefix server
   ```

4. Start the API and web app from the project root:

   ```bash
   npm run dev
   ```

   The API is available at `http://localhost:5000`, the client at `http://localhost:5173`, and health status at `/api/health`.

## Demo accounts

Seeded local development password for all demo users: `Carepoint2026!`

| Role | Email |
| --- | --- |
| Admin | `admin@hospital.com` |
| Doctor | `doctor@hospital.com` |
| Patient | `patient@hospital.com` |

These credentials are for local development only. Change them before exposing a deployment.

## API overview

| Area | Endpoints |
| --- | --- |
| Auth | `POST /api/auth/register`, `POST /api/auth/login`, `GET/PUT /api/auth/me` |
| Doctors | `GET /api/doctors`, `GET /api/doctors/:id`, `GET /api/doctors/:id/availability`, `PUT /api/doctors/:id/availability` |
| Appointments | `POST /api/appointments`, `GET /api/appointments`, `GET /api/appointments/:id`, `PATCH/DELETE /api/appointments/:id` |
| Notifications | `GET /api/notifications`, `PATCH /api/notifications/:id/read` |
| Admin | `GET /api/admin/overview`, `GET /api/admin/users`, `GET/PATCH/POST /api/admin/doctors`, `GET /api/admin/appointments`, department creation |

Protected routes require `Authorization: Bearer <token>`. Doctor self-registration creates an account pending admin approval; seeded doctors are approved. Appointment mutations verify the requesting user's relationship to the appointment and enforce role rules.

## Notes

- Vite proxies `/api` requests to the local Express service.
- The browser shows useful demo specialist cards if the API is unavailable. Real booking requires a running API and MongoDB database.
- Notification reminders are created for booking and appointment changes. A scheduled reminder worker/email/SMS provider is not configured in this local project.
- The contact form is a front-end inquiry form; connect it to a mail service or API before deployment.
