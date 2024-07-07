const net = require('net');


const TcpClient = {
    socket: null,
    isConnected: false,

    connect: function(ip, port, callback) {
        if (this.isConnected) {
            console.log('이미 서버에 연결되어 있습니다.');
            return;
        }

        console.log(`${ip}:${port}로 연결 시도 중...`);

        this.socket = new net.Socket();

        this.socket.connect(port, ip, () => {
            console.log(`${ip}:${port}에 연결되었습니다.`);
            this.isConnected = true;
            if (callback) callback();
        });

        this.socket.on('data', (data) => {
            const message = data.toString();
            console.log('수신된 데이터:', message);

            try {
                const parsedMessage = this.parseMessage(message);
                console.log('파싱된 메시지:', JSON.stringify(parsedMessage, null, 2));

                // 여기에 파싱된 메시지에 대한 추가 처리를 할 수 있습니다.

            } catch (error) {
                console.error('메시지 파싱 오류:', error);
            }
        });

        this.socket.on('close', () => {
            console.log('서버와의 연결이 종료되었습니다.');
            this.isConnected = false;
        });

        this.socket.on('error', (error) => {
            console.error('연결 오류:', error);
            this.isConnected = false;
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