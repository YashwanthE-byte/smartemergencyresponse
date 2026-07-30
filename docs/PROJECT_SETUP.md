# 🛠️ Project Setup & Installation Guide

This document covers local setup instructions, environment variables, database seeding, and testing authentication.

---

## 💻 Prerequisites

* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher
* **MongoDB Atlas Account** *(Optional - automatic fallback mode runs without MongoDB if offline)*

---

## ⚡ Step-by-Step Installation

### 1. Clone & Navigate
```bash
git clone <repository_url>
cd smartemergencyresponse
```

### 2. Configure Backend Environment
Navigate to `backend/` and copy `.env.example` to `.env`:
```bash
cd backend
cp .env.example .env
```
Ensure `.env` contains:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/smart_emergency_db
JWT_SECRET=super_secret_jwt_key_smart_emergency_response_system_2026
CLIENT_URL=http://localhost:5173
```

### 3. Install & Start Backend
```bash
npm install
npm run dev
```

### 4. Configure Frontend Environment
In a separate terminal, navigate to `frontend/`:
```bash
cd frontend
cp .env.example .env
```
Ensure `.env` contains:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

### 5. Install & Start Frontend
```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Testing Authentication Module

1. Open [http://localhost:5173/login](http://localhost:5173/login).
2. Click any of the **One-Click Demo Logins**:
   * **Citizen**: `citizen@emergency.com` -> redirects to `/citizen-dashboard`
   * **Ambulance Driver**: `driver@emergency.com` -> redirects to `/ambulance-dashboard`
   * **Hospital**: `hospital@emergency.com` -> redirects to `/hospital-dashboard`
   * **Admin**: `admin@emergency.com` -> redirects to `/admin`
3. Test custom registration at `/register`. Select a role, enter full name, email, phone, and password (min 6 characters).
4. Verify JWT token is stored securely in `localStorage.getItem('emergency_token')`.
5. Try visiting `/admin` while logged in as a Citizen — observe automatic redirection to `/citizen-dashboard` enforced by `ProtectedRoute`.
