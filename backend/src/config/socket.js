import { Server } from 'socket.io';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log(`[Socket.IO] New client connected: ${socket.id}`);

    const relayLocation = (data) => {
      const latitude = Number(data?.latitude);
      const longitude = Number(data?.longitude);
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return;
      if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) return;

      socket.broadcast.emit('location_changed', {
        ...data,
        latitude,
        longitude,
        updatedAt: new Date().toISOString()
      });
    };

    // Join custom user or role room
    socket.on('join_room', (data) => {
      if (data?.role) {
        const roomName = `role_${data.role.toLowerCase().replace(/\s+/g, '_')}`;
        socket.join(roomName);
        console.log(`[Socket.IO] ${socket.id} joined room: ${roomName}`);
      }
      if (data?.userId) {
        socket.join(`user_${data.userId}`);
        console.log(`[Socket.IO] ${socket.id} joined room: user_${data.userId}`);
      }
    });

    // Accept the documented legacy event as well as the browser's location-update event.
    socket.on('location-update', relayLocation);
    socket.on('update_location', relayLocation);

    // Live SOS trigger event
    socket.on('trigger_sos', (sosData) => {
      io.emit('new_sos_alert', sosData);
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    console.warn('[Socket.IO Warning] Socket.io not initialized yet.');
  }
  return io;
};
