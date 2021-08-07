import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

import app from './app';
import corsOptions from './corsOptions';

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: corsOptions
});

io.on('connection', (socket: Socket) => {
  socket.on('enterLobbies', (rooms: string[]) => {
    socket.join(rooms);
  });

  socket.on('createRoom', (language: string) => {
    const langaugeLobbyRooms = [...socket.rooms].filter(
      (roomName) => roomName !== socket.id
    );

    for (const room of langaugeLobbyRooms) {
      socket.leave(room);
    }

    socket.to(language).emit('newRoomAvailable');
  });
});

httpServer.listen(process.env.PORT);
