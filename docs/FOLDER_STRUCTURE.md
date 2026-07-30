# 📂 Folder Structure Explanation

```text
smartemergencyresponse/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                 # Mongoose connection & fallback handler
│   │   │   └── socket.js             # Socket.IO event listener initialization & rooms
│   │   ├── controllers/
│   │   │   ├── authController.js     # User registration, login, profile, token generation
│   │   │   ├── userController.js     # User list & profile management
│   │   │   ├── sosController.js      # One-tap SOS creation, status updates & socket broadcasting
│   │   │   ├── hospitalController.js # Hospital bed inventory and trauma details
│   │   │   ├── ambulanceController.js# Vehicle telemetry, driver status, dispatch
│   │   │   ├── contactController.js  # Emergency contact CRUD
│   │   │   ├── notificationController.js # Targeted system alerts
│   │   │   └── analyticsController.js# System metrics for admin dashboard
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js     # Protect route & role-authorization (Citizen, Driver, Hospital, Admin)
│   │   │   └── errorMiddleware.js    # Global error & 404 handler
│   │   ├── models/
│   │   │   ├── User.js               # User schema with bcrypt pre-save hashing & password compare
│   │   │   ├── SOSRequest.js         # SOS schema with 2dsphere GeoJSON location
│   │   │   ├── Hospital.js           # Hospital schema with total/available beds & ICU count
│   │   │   ├── Ambulance.js          # Vehicle schema with status & driver reference
│   │   │   ├── EmergencyContact.js   # Citizen emergency contacts schema
│   │   │   └── Notification.js       # System notifications schema
│   │   ├── routes/                   # Express router endpoints
│   │   ├── seed/                     # Seed script for demo database population
│   │   └── server.js                 # Express server & socket.io setup
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/               # Shared Navbar, Footer, LoadingSpinner, ProtectedRoute
│   │   │   ├── map/                  # Leaflet interactive LiveMapComponent
│   │   │   └── sos/                  # One-tap SOS button widget with geolocation
│   │   ├── context/
│   │   │   ├── AuthContext.jsx       # Global auth state, token storage, login/logout methods
│   │   │   └── SocketContext.jsx     # Socket.IO connection & listener provider
│   │   ├── pages/                    # 14 complete responsive pages:
│   │   │                             # Home, Login, Register, CitizenDashboard, SOSPage,
│   │   │                             # LiveMap, NearbyHospitals, EmergencyContacts,
│   │   │                             # AIFirstAidChat, Profile, AdminDashboard,
│   │   │                             # AmbulanceDashboard, HospitalDashboard, NotFound
│   │   ├── services/
│   │   │   ├── api.js                # Axios instance with Bearer token interceptor
│   │   │   └── authService.js        # Auth endpoint bindings
│   │   ├── App.jsx                   # React Router route configuration
│   │   ├── main.jsx                  # React 19 entry point
│   │   └── index.css                 # Tailwind CSS & custom design system rules
│   ├── index.html
│   └── package.json
└── docs/                             # Full documentation
```
