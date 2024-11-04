const socketIo = require('socket.io');
const http = require('http');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: "*",
  })); // Apply CORS middleware to your Express app

const server = http.createServer(app);

function startSocketServer(port) {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A client connected');

    socket.on('message', (message) => {
      console.log('Received message:', message);
      io.emit('message', message);
    });

    socket.on('disconnect', () => {
      console.log('A client disconnected');
    });
  });

  server.listen(port, () => {
    console.log(`Socket server listening on port ${port}`);
  });
}

startSocketServer(9090);
