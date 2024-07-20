
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {Configurator, MsgSender, TcpClient } = require('./service/tcpService');
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
        console.log('connection is established');

        const configurator = Configurator.get();
        const e_msg = {
            Type: 'RESPONSE',
            Command: 'WHOAMI',
            Token: configurator.generateToken(),
            From: configurator.getName(),
            To: 'IMS', // info.name에 해당하는 값
            Data: configurator.getName()
        };

        // 메시지 전송
        const msgSender = new MsgSender(TcpClient);
        msgSender.parseAndSend(e_msg);

    })
    .catch((error) => {
        console.error('error is ocurred during connection:', error);
    });
module.exports = app;
