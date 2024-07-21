const net = require('net');

class Configurator {
    static get() {
        return new Configurator();
    }

    generateToken() {
        return '20240721-0039';
    }

    getName() {
        return 'PANIEL_BACKEND';
    }
}

class MsgSender {
    constructor(tcpClient) {
        this.tcpClient = tcpClient;
    }

    parseAndSend(e_msg) {
        const message = JSON.stringify(e_msg);
        const messageBuffer = Buffer.from(message, 'utf8');
        const messageSize = messageBuffer.length;

        const sizeBuffer = Buffer.alloc(4);
        sizeBuffer.writeInt32LE(messageSize);

        const typeBuffer = Buffer.from([0x01]); // Assuming PACKETTYPE_JSON is 0x01

        const totalSize = 4 + 1 + messageSize; // size (4 bytes) + type (1 byte) + message
        const finalBuffer = Buffer.alloc(totalSize);

        sizeBuffer.copy(finalBuffer, 0);
        typeBuffer.copy(finalBuffer, 4);
        messageBuffer.copy(finalBuffer, 5);

        this.tcpClient.send(finalBuffer);
    }
}

const TcpClient = {
    socket: null,
    isConnected: false,
    retryInterval: 5000, // 5초 후 재시도
    retrying: false,

    connect: function(ip, port) {
        return new Promise((resolve, reject) => {
            const attemptConnection = () => {
                if (this.isConnected) {
                    console.log('connection is already established.');
                    return resolve();
                }

                if (!this.retrying) {
                    console.log(`trying to connect .. ${ip}:${port}`);
                }

                this.socket = new net.Socket();

                this.socket.connect(port, ip, () => {
                    console.log(`connected . ${ip}:${port} .`);
                    this.isConnected = true;
                    this.retrying = false;
                    resolve();
                });

                this.socket.on('data', (data) => {
                    const message = data.toString('utf8');
                    console.log('received data :', message);

                    try {
                        const parsedMessage = this.parseMessage(data);
                        console.log('parsed message:', JSON.stringify(parsedMessage, null, 2));
                    } catch (error) {
                        console.error('parsing error :', error);
                    }
                });

                this.socket.on('close', () => {
                    if (!this.retrying) {
                        console.log('server connection is closed');
                    }
                    else {
                        console.log('retrying to connect');
                    }
                    this.isConnected = false;
                });

                this.socket.on('error', (error) => {
                    if (!this.retrying) {
                        console.error('connection error :', error);
                        console.log('connection is finished');
                    }
                    this.isConnected = false;
                    this.retrying = true;
                    setTimeout(attemptConnection, this.retryInterval); // 재시도
                });
            };

            attemptConnection();
        });
    },

    parseMessage: function(message) {
        try {
            const jsonString = message.slice(5).toString('utf8');
            const parsedData = JSON.parse(jsonString);
            return parsedData;
        } catch (error) {
            throw new Error('Failed to parse message: ' + error.message);
        }
    },

    send: function(message) {
        if (!this.isConnected) {
            console.error('connection is not established.');
            return;
        }
        console.log('Sending raw data: ', message);
        this.socket.write(message);
    }
};

module.exports = {
    Configurator,
    MsgSender,
    TcpClient
};