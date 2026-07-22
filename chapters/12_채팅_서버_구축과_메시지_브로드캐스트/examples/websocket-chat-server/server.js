const { WebSocketServer, WebSocket } = require('ws');

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

console.log(`[server] WebSocket chat server listening on ws://0.0.0.0:${PORT}`);

wss.on('connection', (socket) => {
  const userId = `user-${Date.now()}`;
  console.log(`[connect] ${userId} joined. total=${wss.clients.size}`);

  sendSystemMessage(`${userId} 님이 입장했습니다.`);

  socket.on('message', (rawMessage) => {
    const text = rawMessage.toString().trim();

    if (!text) {
      return;
    }

    console.log(`[message] ${userId}: ${text}`);
    broadcastMessage(`${userId}: ${text}`);
  });

  socket.on('close', () => {
    console.log(`[close] ${userId} left. total=${Math.max(wss.clients.size - 1, 0)}`);
    sendSystemMessage(`${userId} 님이 퇴장했습니다.`);
  });

  socket.on('error', (error) => {
    console.log(`[error] ${userId}: ${error.message}`);
  });
});

function broadcastMessage(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

function sendSystemMessage(message) {
  broadcastMessage(`[system] ${message}`);
}
