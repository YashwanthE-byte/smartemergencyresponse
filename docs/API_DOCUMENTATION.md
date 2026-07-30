# 📡 REST API Documentation - Smart Emergency Response System

All API endpoints are prefixed with `/api`. Protected routes require a valid JWT passed in the header:
`Authorization: Bearer <JWT_TOKEN>`

---

## 1. Authentication Endpoints (`/api/auth`)

### `POST /api/auth/register`
Creates a new user account.

* **Access**: Public
* **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@emergency.com",
    "phone": "+1 555-0199",
    "password": "secretpassword123",
    "role": "Citizen", // Options: "Citizen", "Ambulance Driver", "Hospital", "Admin"
    "bloodGroup": "O+"
  }
  ```
* **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Registration successful",
    "token": "eyJhbGciOiJIUzI1Ni...",
    "user": {
      "_id": "66a100...",
      "name": "Jane Doe",
      "email": "jane@emergency.com",
      "role": "Citizen"
    }
  }
  ```

---

### `POST /api/auth/login`
Authenticates a user and returns a JWT token.

* **Access**: Public
* **Request Body**:
  ```json
  {
    "email": "jane@emergency.com",
    "password": "secretpassword123"
  }
  ```
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1Ni...",
    "user": {
      "_id": "66a100...",
      "name": "Jane Doe",
      "role": "Citizen"
    }
  }
  ```

---

### `GET /api/auth/profile`
Retrieves the logged-in user's profile details.

* **Access**: Private (Bearer Token Required)
* **Response (200 OK)**:
  ```json
  {
    "success": true,
    "user": {
      "_id": "66a100...",
      "name": "Jane Doe",
      "email": "jane@emergency.com",
      "phone": "+1 555-0199",
      "role": "Citizen",
      "bloodGroup": "O+"
    }
  }
  ```

---

## 2. Emergency SOS Endpoints (`/api/sos`)

### `POST /api/sos`
Triggers a new emergency SOS alert with live geolocation coordinates.

* **Access**: Private
* **Request Body**:
  ```json
  {
    "emergencyType": "Cardiac",
    "latitude": 12.9716,
    "longitude": 77.5946,
    "severity": "High"
  }
  ```

### `GET /api/sos`
Lists active and past emergency SOS requests.

---

## 3. Hospital & Bed Management (`/api/hospitals`)

### `GET /api/hospitals`
Returns nearby operational hospitals, bed counts, and trauma levels.

### `PUT /api/hospitals/:id/beds`
Updates available general and ICU bed capacity.

* **Access**: Private (Role: Hospital, Admin)
