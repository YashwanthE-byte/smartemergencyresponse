import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CitizenDashboard from './pages/CitizenDashboard';
import SOSPage from './pages/SOSPage';
import LiveMap from './pages/LiveMap';
import NearbyHospitals from './pages/NearbyHospitals';
import EmergencyContacts from './pages/EmergencyContacts';
import AIFirstAidChat from './pages/AIFirstAidChat';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AmbulanceDashboard from './pages/AmbulanceDashboard';
import HospitalDashboard from './pages/HospitalDashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-[#090d16] text-gray-100 font-sans selection:bg-red-600 selection:text-white">
            <Navbar />

            <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/sos" element={<SOSPage />} />
                <Route path="/map" element={<LiveMap />} />
                <Route path="/hospitals" element={<NearbyHospitals />} />
                <Route path="/first-aid" element={<AIFirstAidChat />} />

                {/* Protected Routes */}
                <Route
                  path="/citizen-dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['Citizen', 'Admin']}>
                      <CitizenDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/contacts"
                  element={
                    <ProtectedRoute>
                      <EmergencyContacts />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={['Admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/ambulance-dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['Ambulance Driver', 'Admin']}>
                      <AmbulanceDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/hospital-dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['Hospital', 'Admin']}>
                      <HospitalDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;