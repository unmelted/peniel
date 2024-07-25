
const net = require('net');

class Configurator {
    static generateToken() {
        return '20240721-0039';
    }

    static getName() {
        return 'PANIEL_BACKEND';
    }
}

class MsgSender {
    constructor(client) {
        this.client = client;
        console.log(`Client: ${this.client}, IsConnected: ${this.client ? this.client.isConnected : 'undefined'}`);
    }

    parseAndSend(e_msg) {
        const message = JSON.stringify(e_msg);
        const messageBuffer = Buffer.from(message, 'utf8');
        const messageSize = messageBuffer.length;

        const sizeBuffer = Buffer.alloc(4);
        sizeBuffer.writeInt32LE(messageSize);

        const typeBuffer = Buffer.from([0x00]); // Assuming PACKETTYPE_JSON is 0x01
        const totalSize = 4 + 1 + messageSize; // size (4 bytes) + type (1 byte) + message
        const finalBuffer = Buffer.alloc(totalSize);

        sizeBuffer.copy(finalBuffer, 0);
        typeBuffer.copy(finalBuffer, 4);
        messageBuffer.copy(finalBuffer, 5);


        if (this.client && this.client.isConnected) {
            this.client.send(finalBuffer);
        } else {
            console.error('Client is not connected');
        }
    }
}

class TcpClient {
    constructor() {
        this.socket = null;
        this.isConnected = false;
        this.retryInterval = 5000; // 5초 후 재시도
        this.dataProcessor = null;
        this.retrying = false;
        this.retryTimeout = null;
        this.isTryingToConnect = false;
    }

    connect(ip, port, dataProcessor) {
        this.dataProcessor = dataProcessor;
        return new Promise((resolve, reject) => {
            const attemptConnection = () => {
                if (this.isConnected) {
                    console.log('Connection is already established.');
                    return resolve();
                }
                if (this.isTryingToConnect) {
                    console.log('Already trying to connect. Please wait.');
                    return;
                }

                this.isTryingToConnect = true;

                if (!this.retrying) {
                    console.log(`Trying to connect... ${ip}:${port}`);
                }

                this.socket = new net.Socket();

                this.socket.connect(port, ip, () => {
                    console.log(`Connected to ${ip}:${port}.`);
                    this.isConnected = true;
                    this.retrying = false;
                    this.isTryingToConnect = false;
                    console.log('isConnected :', this.isConnected);

                    if (this.retryTimeout) {
                        clearTimeout(this.retryTimeout);
                        this.retryTimeout = null;
                    }

                    const e_msg = {
                        Type: 'RESPONSE',
                        Command: 'WHOAMI',
                        Token: Configurator.generateToken(),
                        From: Configurator.getName(),
                        To: 'IMS', // info.name에 해당하는 값
                        Data: Configurator.getName()
                    };

                    // 메시지 전송
                    const msgSender = new MsgSender(this);
                    msgSender.parseAndSend(e_msg);

                    resolve();
                });

                this.socket.on('data', (data) => {
                    const message = data.toString('utf8');
                    console.log('Received data:', message);

                    try {
                        const parsedMessage = this.parseMessage(data);
                        if (this.dataProcessor) {
                            this.dataProcessor.process(parsedMessage);
                        } else {
                            console.error('DataProcessor is not set.');
                        }
                    } catch (error) {
                        console.error('Parsing error:', error);
                    }
                });

                this.socket.on('close', () => {
                    if (!this.retrying) {
                        console.log('Server connection is closed');
                        if (this.dataProcessor) {
                            this.dataProcessor.processFromSocket();
                        }
                    } else {
                        console.log('Retrying to connect');
                    }
                    this.isConnected = false;
                    this.retrying = true;
                    this.isTryingToConnect = false;
                    this.retryTimeout = setTimeout(attemptConnection, this.retryInterval);
                });

                this.socket.on('error', (error) => {
                    if (!this.retrying) {
                        console.error('Connection error:', error);
                        console.log('Connection is finished');
                    }
                    this.isConnected = false;
                    this.retrying = true;
                    this.isTryingToConnect = false;
                    this.retryTimeout = setTimeout(attemptConnection, this.retryInterval);
                });
            };

            attemptConnection();
        });
    }

    parseMessage(message) {
        try {
            const jsonString = message.slice(5).toString('utf8');
            const parsedData = JSON.parse(jsonString);
            return parsedData;
        } catch (error) {
            throw new Error('Failed to parse message: ' + error.message);
        }
    }

    send(message) {
        if (!this.isConnected) {
            console.error('Connection is not established.');
            return;
        }
        console.log('Sending raw data:', message);
        this.socket.write(message);
    }
}

module.exports = { Configurator, MsgSender, TcpClient };