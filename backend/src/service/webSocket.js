const WebSocket = require('ws');

const wss = new WebSocket.Server({ port:  process.env.WEBSOCKET_PORT });

wss.on('connection', ws => {
    console.log('WebSocket Client connected');
    ws.on('close', () => {
        console.log('WebSocket Client disconnected');
    });
});

function sendToWeb(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

module.exports = sendToWeb;
