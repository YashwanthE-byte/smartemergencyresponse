import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [activeAlerts, setActiveAlerts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5
    });

    newSocket.on('connect', () => {
      console.log('[Socket.IO Frontend] Connected:', newSocket.id);
      if (user) {
        newSocket.emit('join_room', { userId: user._id, role: user.role });
      }
    });

    newSocket.on('new_sos_alert', (sosData) => {
      console.log('[Socket.IO Alert Received]', sosData);
      setActiveAlerts((prev) => [sosData, ...prev]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  const dismissAlert = (id) => {
    setActiveAlerts((prev) => prev.filter((a) => a._id !== id));
  };

  return (
    <SocketContext.Provider value={{ socket, activeAlerts, dismissAlert }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
