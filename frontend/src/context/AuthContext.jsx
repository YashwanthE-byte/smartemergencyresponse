import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('emergency_token') || null);
  const [loading, setLoading] = useState(true);

  // Helper: Get dashboard path according to user role
  const getDashboardPath = (role) => {
    switch (role) {
      case 'Ambulance Driver':
        return '/ambulance-dashboard';
      case 'Hospital':
        return '/hospital-dashboard';
      case 'Admin':
        return '/admin';
      case 'Citizen':
      default:
        return '/citizen-dashboard';
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await authService.getProfile();
          if (res.success && res.user) {
            setUser(res.user);
          } else {
            logout();
          }
        } catch (err) {
          console.warn('[AuthContext] Session expired or server unavailable:', err.message);
          // If profile fetch fails but token exists, attempt to parse demo token fallback if needed
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await authService.login(credentials);
      if (res.token) {
        localStorage.setItem('emergency_token', res.token);
        setToken(res.token);
        setUser(res.user);
        return { success: true, role: res.user.role, targetPath: getDashboardPath(res.user.role) };
      }
      return { success: false, message: res.message || 'Login failed' };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await authService.register(userData);
      if (res.token) {
        localStorage.setItem('emergency_token', res.token);
        setToken(res.token);
        setUser(res.user);
        return { success: true, role: res.user.role, targetPath: getDashboardPath(res.user.role) };
      }
      return { success: false, message: res.message || 'Registration failed' };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('emergency_token');
    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedFields) => {
    setUser((prev) => (prev ? { ...prev, ...updatedFields } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        updateUser,
        getDashboardPath
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
