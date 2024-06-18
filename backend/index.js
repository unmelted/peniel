
require('dotenv').config(); // .env 파일 로드

const app = require('./src/app');
const tcpServer = require('./src/services/tcpService');

const PORT = process.env.PORT || 3000;
const TCP_PORT = process.env.TCP_PORT || 4000;

// HTTP 서버 시작
app.listen(PORT, () => {
    console.log(`HTTP Server is running on http://localhost:${PORT}`);
});

// TCP 서버 시작
tcpServer.listen(TCP_PORT, () => {
    console.log(`TCP Server listening on port ${TCP_PORT}`);
});