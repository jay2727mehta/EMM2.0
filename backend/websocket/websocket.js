const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9090 });


const clients = []; // Array to store WebSocket connections

function createWebSocketServer() {
  wss.on('connection', (ws) => {
   
    clients.push(ws); // Store the WebSocket connection

    ws.on('message', (message) => {
      console.log('Received message:', message);
      // Parse the incoming message
      const data = message;
      console.log('Received data:', data);

    });
    console.log(clients)
    ws.on('close', () => {
      console.log('Client disconnected');
      // Remove the WebSocket connection from the array when client disconnects
      const index = clients.indexOf(ws);
      if (index !== -1) {
        clients.splice(index, 1);
      }
    });
  });
}

// Function to send a message to all connected clients
function sendToAllClients(message) {
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      console.log('Client connected1111111111')
      client.send(message);
    } else {
      console.error('WebSocket client is not open:', client.readyState);
    }
  });
}

createWebSocketServer();
sendToAllClients("hello world");
module.exports = {
  createWebSocketServer,
  sendToAllClients
};
