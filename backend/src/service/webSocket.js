const WebSocket = require('ws');

let wss;

function createWebSocketServer() {
    if (wss) {
        console.log('WebSocket server is already running.');
        return wss;
    }

    try {
        const port = process.env.WEBSOCKET_PORT;
        wss = new WebSocket.Server({ port });
        console.log(`WebSocket server started on port ${port}.`);

        wss.on('connection', ws => {
            console.log('WebSocket Client connected');

            ws.on('message', message => {
                console.log('received:', message);

                try {
                    const parsedMessage = JSON.parse(message);
                    switch (parsedMessage.type) {
                        case 'EVENT_INFO':
                            sendRobotData(ws, parsedMessage.data);
                            break;
                        case 'EVENT_LOG':
                            sendEventLog(ws, parsedMessage.data);
                            break;
                        case 'EVENT_OTHER':
                            sendOtherData(ws, parsedMessage.data);
                            break;
                        default:
                            console.log('Unknown message type:', parsedMessage.type);
                    }
                } catch (error) {
                    console.error('Error processing message:', error);
                }
            });

            ws.on('close', () => {
                console.log('WebSocket Client disconnected');
            });
        });

        wss.on('error', (error) => {
            console.error('WebSocket server error:', error);
            if (error.code === 'EADDRINUSE') {
                console.error(`Port ${port} is already in use.`);
            }
        });

        return wss;

    } catch (error) {
        console.error('Error starting WebSocket server:', error);
    }
}

// const server = createWebSocketServer();


function sendRobotData(ws, robots) {
    const robotsObj = Object.fromEntries(robots);
    const jsonData = JSON.stringify({
        type: 'EVENT_INFO',
        data: robotsObj
    });
    ws.send(jsonData);
}

function sendEventLog(ws, log) {
    const jsonData = JSON.stringify({
        type: 'EVENT_LOG',
        data: log
    });
    ws.send(jsonData);
}

function sendOtherData(ws, otherData) {
    const jsonData = JSON.stringify({
        type: 'EVENT_OTHER',
        data: otherData
    });
    ws.send(jsonData);
}

module.exports = {
    createWebSocketServer,
    sendRobotData,
    sendEventLog,
    sendOtherData
};
