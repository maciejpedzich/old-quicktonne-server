import { createServer } from 'http';
import { Server as SocketIoServer, Socket } from 'socket.io';
import { config as loadEnv } from 'dotenv';

import ChatMessage from './types/ChatMessage';
import CursorLocation from './types/CursorLocation';

loadEnv();

const httpServer = createServer();
const io = new SocketIoServer(httpServer, {
  cors: {
    origin: process.env.ORIGIN_URL,
    credentials: true
  }
});

io.on('connection', (socket: Socket) => {
  socket.on('joinRoom', (room: string) => socket.join(room));

  socket.on('leaveRoom', (room: string) => socket.leave(room));

  socket.on('incomingChatMessage', (room: string, message: ChatMessage) =>
    socket.to(room).emit('newChatMessage', message)
  );

  socket.on('incomingCursorChange', (room: string, location: CursorLocation) =>
    socket.to(room).emit('remoteCursorChange', location)
  );

  socket.on('incomingContentChange', (room: string, content: string) =>
    socket.to(room).emit('contentChange', content)
  );
});

httpServer.listen(process.env.PORT);
