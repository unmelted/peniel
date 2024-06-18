
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const robotRoutes = require('./routes/robotRoutes');
const tcpServer = require('./services/tcpService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', robotRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const TCP_PORT = 4000;
tcpServer.listen(TCP_PORT, () => {
    console.log(`TCP Server listening on port ${TCP_PORT}`);
});