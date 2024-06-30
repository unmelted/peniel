
require('dotenv').config(); // .env 파일 로드

const app = require('./src/app');
const tcpServer = require('./src/service/tcpService');

const PORT = process.env.PORT ;
const TCP_PORT = process.env.TCP_PORT;

