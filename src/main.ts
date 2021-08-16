import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { config as loadEnv } from 'dotenv';

import ChatMessage from './types/ChatMessage';

loadEnv();

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: process.env.ORIGIN_URL,
    credentials: true
  }
});

io.on('connection', (socket: Socket) => {
  socket.on('joinRoom', (room: string) => socket.join(room));

  socket.on('leaveRoom', (room: string) => socket.leave(room));

  socket.on('incomingChatMessage', (roomId: string, message: ChatMessage) =>
    socket.to(roomId).emit('newChatMessage', message)
  );
});

httpServer.listen(process.env.PORT);
