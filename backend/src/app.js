
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
TcpClient.connect(TCP_HOST, TCP_PORT, () => {
    console.log(`TCP Server ${TCP_HOST}:${TCP_PORT}.`);
});

module.exports = app;
