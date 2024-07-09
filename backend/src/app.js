
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const TcpClient = require('./service/tcpService');
const robotRoutes = require('./routes/robotRoutes');
const logRoutes = require('./routes/logRoutes');
const notifyRoutes = require('./routes/notifyRoutes');

const app = express();
const WEB_PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', robotRoutes);
app.use('/api', logRoutes);
app.use('/api', notifyRoutes);

app.listen(WEB_PORT, () => {
    console.log(`Server is running on http://localhost:${WEB_PORT}`);
});

const TCP_HOST = process.env.TCP_HOST
const TCP_PORT = process.env.TCP_PORT;
TcpClient.connect(TCP_HOST, TCP_PORT)
    .then(() => {
        console.log('연결이 성공적으로 완료되었습니다.');
        // 연결 후 보낼 메시지 예시
        TcpClient.send('Type,Command,SubCommand,Action,Token,From,To,Data');
    })
    .catch((error) => {
        console.error('연결 중 오류가 발생했습니다:', error);
    });
module.exports = app;
