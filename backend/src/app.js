
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {Configurator, MsgSender, TcpClient } = require('./service/tcpService');
const DataProcessor = require('./service/dataProcessor');
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


const TCP_HOST = process.env.TCP_HOST;
const TCP_PORT = process.env.TCP_PORT;

const tcpClient = new TcpClient();
const dataProcessor = new DataProcessor(tcpClient);

tcpClient.connect(TCP_HOST, TCP_PORT, dataProcessor)
    .then(() => {
        console.log('Connection is established');

        const e_msg = {
            Type: 'RESPONSE',
            Command: 'WHOAMI',
            Token: Configurator.generateToken(),
            From: Configurator.getName(),
            To: 'IMS', // info.name에 해당하는 값
            Data: Configurator.getName()
        };

        // 메시지 전송
        const msgSender = new MsgSender(tcpClient);
        msgSender.parseAndSend(e_msg);

    })
    .catch((error) => {
        console.error('Error occurred during connection:', error);
    });

module.exports = app;
