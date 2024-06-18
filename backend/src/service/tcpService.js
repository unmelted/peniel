const net = require('net');
const Robot = require('../models/robotModel');

const tcpServer = net.createServer((socket) => {
    socket.on('data', (data) => {
        const message = data.toString();
        console.log('Received:', message);

        // 예제: TCP 메시지를 파싱하고 데이터베이스에 저장
        const [name, status, section2Text, section3Text] = message.split(',');

        Robot.addRobot(name, status, section2Text, section3Text);
    });

    socket.on('end', () => {
        console.log('Disconnected');
    });
});

module.exports = tcpServer;