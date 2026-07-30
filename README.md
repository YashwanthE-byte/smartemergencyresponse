# 🚨 Smart Emergency Response System (RESQUE AI)

A production-ready, full-stack **Smart Emergency Response System** featuring role-based authorization, One-Tap Geolocation SOS triggers, real-time hospital bed tracking, Socket.IO live ambulance location streaming, and an AI First Aid Triage Assistant.

---

## 🌟 Key Features

* **Multi-Role Authorization**: Tailored UI and backend permissions for 4 distinct roles:
  * 👤 **Citizen**: Trigger SOS, manage emergency contacts, track incident status, consult AI first aid.
  * 🚑 **Ambulance Driver**: Receive real-time dispatch assignments, GPS navigation, update vehicle status.
  * 🏥 **Hospital Staff**: Live bed & ICU capacity broadcast, pre-triage incoming ambulance units.
  * 🛡️ **Admin**: Network-wide analytics, active incident oversight, emergency response metrics.
* **One-Tap Geolocation SOS**: Instant broadcast of GPS coordinates (`lat`/`lng`) to dispatchers and nearby responders.
* **Socket.IO Real-Time Engine**: Event-driven alerts, status updates, and vehicle movement.
* **JWT & bcrypt Security**: Secure authentication with role-based route protection.
* **Resilient Architecture**: Supports MongoDB Atlas with automatic, smooth in-memory fallback for immediate zero-config testing out of the box.

---

## 📁 Repository Structure

```text
smartemergencyresponse/
├── backend/                  # Node.js + Express + Mongoose + Socket.IO API
│   ├── src/
│   │   ├── config/           # Database & Socket.IO configurations
│   │   ├── controllers/      # MVC controllers (Auth, SOS, Hospitals, Ambulances, Contacts, Analytics)
│   │   ├── middleware/       # JWT auth & error handler middlewares
│   │   ├── models/           # Mongoose schemas (User, SOSRequest, Hospital, Ambulance, Contact, Notification)
│   │   ├── routes/           # REST API endpoints
│   │   ├── seed/             # Seeder script for initial demo database
│   │   └── server.js         # Server entry point
│   ├── package.json
│   └── .env
├── frontend/                 # React 19 + Vite + Tailwind CSS SPA
│   ├── src/
│   │   ├── components/       # Reusable UI (Navbar, Footer, SOSButton, LiveMapComponent, ProtectedRoute)
│   │   ├── context/          # AuthContext & SocketContext
│   │   ├── pages/            # 14 responsive page views
│   │   ├── services/         # Axios API service instances
│   │   └── App.jsx           # React Router v6 setup
│   ├── package.json
│   └── .env
└── docs/                     # Comprehensive Project Documentation
    ├── API_DOCUMENTATION.md
    ├── PROJECT_SETUP.md
    └── FOLDER_STRUCTURE.md
```

---

## 🚀 Quick Start Guide

### 1. Backend Setup

```bash
cd backend
npm install
npm run dev
```

The Express API server starts on **http://localhost:5000**.

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The Vite React application opens on **http://localhost:5173**.

---

## 🔑 Demo Login Credentials

For quick testing without creating a new account:

* **Citizen**: `citizen@emergency.com` | Password: `demo123`
* **Ambulance Driver**: `driver@emergency.com` | Password: `demo123`
* **Hospital**: `hospital@emergency.com` | Password: `demo123`
* **Admin**: `admin@emergency.com` | Password: `demo123`
