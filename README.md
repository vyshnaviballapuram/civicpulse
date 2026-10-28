# Smart Governance Platform for Administrative Operations with Citizen Service Assistance

A full-stack web platform that connects citizens and municipal officers for transparent, trackable civic issue reporting and resolution. Citizens file and track grievances (roads, water, electricity, garbage, etc.); officers manage a live resolution queue with role-based access.

> Built as part of the **Infosys Springboard Internship** program.

---

## Features

### Citizen Portal
- Landing page (Hero, About, Services, How It Works, Features, Statistics, Contact)
- Quick complaint-filing modal available from anywhere on the site
- Public complaint tracker — check status using a Complaint ID
- Citizen dashboard: **Overview** (total / pending / in-progress / resolved), **My Complaints** (with urgency tags), **File New Complaint**

### Officer / Admin Portal
- Separate login using **Officer ID + Department**
- Dashboard with system-wide, real-time metrics
- Status transitions: `Pending → In-Progress → Resolved`
- Filter and search by status or category

### Platform Highlights
- **Geocoding & jurisdiction verification** — validates that a complaint location exists (OpenStreetMap Nominatim), checks it is inside India, and classifies it by distance (Haversine) into Local / Regional / Inter-State zones, with cached lookups
- **Hybrid database resiliency** — uses MongoDB Atlas; automatically falls back to in-memory storage if the database is unreachable
- **Role-based access** — JWT authentication with separate `user` and `admin` roles
- Passwords hashed with bcrypt; OTP email support via SMTP

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, Vite, React Router DOM v7, Axios, Tailwind CSS v4, React Icons |
| Backend | Node.js, Express 5, MongoDB (native driver), JSON Web Tokens, bcryptjs, CORS, dotenv |
| Database | MongoDB Atlas (with in-memory fallback) |
| External API | OpenStreetMap Nominatim (geocoding) |

---

## Project Structure

```
.
├── backend/
│   ├── index.js          # Express server, routes, DB connection, geocoding
│   ├── package.json
│   └── .env              # Environment variables (not committed)
└── frontend/
    ├── src/
    │   ├── components/   # UI sections, modals, admin/citizen/dashboard components
    │   ├── pages/        # Route pages
    │   ├── layouts/
    │   ├── services/     # API calls
    │   └── App.jsx
    ├── vite.config.js    # Dev server on :8085, proxies /api → :5000
    └── package.json
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- A MongoDB Atlas cluster (free M0 tier works) — optional, the app falls back to in-memory storage without it

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <repo-folder>
```

### 2. Configure the backend

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
JWT_SECRET=your_long_random_secret
PUBLIC_KEY=your_public_key

# SMTP settings for OTP emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_app_password
```

> Never commit `.env` to version control.

### 3. Run the backend

```bash
cd backend
npm install
node index.js
```

Runs on **http://localhost:5000**. If MongoDB can't be reached, the console will report a fallback to in-memory storage (data is lost on restart).

### 4. Run the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:8085**. Both servers must be running at the same time — the frontend proxies all `/api` requests to the backend.

---

## API Endpoints

| Method | Route | Description | Access |
|---|---|---|---|
| POST | `/api/auth/register` | Register a citizen or officer | Public |
| POST | `/api/auth/login` | Log in and receive a JWT | Public |
| GET | `/api/user/profile` | Get the authenticated user's profile | Authenticated |
| POST | `/api/complaints` | Submit a new complaint | Public / Authenticated |
| GET | `/api/complaints` | List complaints (own for citizens, all for officers) | Authenticated |
| GET | `/api/complaints/stats` | Complaint counts by status | Public |
| GET | `/api/complaints/:id` | Look up a complaint by ID | Public |
| PATCH | `/api/complaints/:id/status` | Update complaint status | Officer only |
| GET | `/api/geocode?q=<place>` | Verify a location and jurisdiction | Public |

> Note: in `backend/index.js`, the `/api/complaints/stats` route must be declared **before** `/api/complaints/:id`, otherwise Express treats `stats` as an ID.

---

## Data Models

**User** — `name`, `email` (unique), `phone`, `password` (bcrypt hash), `role` (`user` | `admin`), `officerId`, `department`, `createdAt`

**Complaint** — `title`, `category`, `description`, `location`, `urgency` (Low–Critical), `status` (`pending` | `in-progress` | `resolved`), `userId`, `userName`, `createdAt`

---

## Security

- bcrypt password hashing (10 salt rounds)
- JWT bearer tokens with 1-day expiry
- Authorization header required on protected routes
- Server-side role checks for officer-only actions

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `MongoDB connection failed … SSL alert` | Add your IP (or `0.0.0.0/0` for development) under Atlas → Network Access; verify `MONGODB_URI`; update Node.js |
| Data disappears after restart | Backend is using the in-memory fallback — fix the MongoDB connection |
| Frontend loads but login/complaints fail | Backend isn't running on port 5000 |
| `/api/complaints/stats` returns "Complaint not found" | Move the `/stats` route above `/:id` in `backend/index.js` |

---

## Future Enhancements

- Photo / document attachments (Cloudinary or AWS S3)
- Interactive GIS map pinning (Leaflet / Google Maps)
- Real-time SMS and email status notifications (Twilio / Nodemailer)
- Analytics dashboard with complaint heatmaps

---

## Author

**Vyshnavi Ballapuram** — Infosys Springboard Internship Project