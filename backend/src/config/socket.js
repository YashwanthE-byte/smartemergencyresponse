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

    // Real-time location updates from Ambulance Drivers or Citizens
    socket.on('update_location', (data) => {
      socket.broadcast.emit('location_changed', data);
    });

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
