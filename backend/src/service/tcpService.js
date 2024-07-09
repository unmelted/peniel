const net = require('net');

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
                    const message = data.toString();
                    console.log('received data :', message);

                    try {
                        const parsedMessage = this.parseMessage(message);
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
        const [Type, Command, SubCommand, Action, Token, From, To, Data] = message.split(',');
        return {
            Type,
            Command,
            SubCommand,
            Action,
            Token,
            From,
            To,
            Data
        };
    },

    send: function(message) {
        if (!this.isConnected) {
            console.error('서버에 연결되어 있지 않습니다.');
            return;
        }
        this.socket.write(message);
    }
};

module.exports = TcpClient;