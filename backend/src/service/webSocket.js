const WebSocket = require('ws');

const wss = new WebSocket.Server({ port:  process.env.WEBSOCKET_PORT });

wss.on('connection', ws => {
    console.log('WebSocket Client connected');

    ws.on('message', message => {
        console.log('received:', message);
        if (message === 'EVENT_INFO') {
            sendRobotData(ws);
        } else if (message === 'EVENT_LOG') {
            sendEventLog(ws);
        }
        else if (message === 'EVENT_OTHER') {
            sendOtherData(ws);
        }
    });

    ws.on('close', () => {
        console.log('WebSocket Client disconnected');
    });
});

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
    wss,
    sendRobotData,
    sendEventLog,
    sendOtherData
};
