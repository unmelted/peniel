
const { Robot, RobotArm, Connection } = require('../models/robotData');
const {Configurator, MsgSender, TcpClient} = require("./tcpService");

class DataProcessor {
    constructor(tcpClient) {
        this.robots = new Map(); // 로봇 데이터를 저장할 맵
        this.connection = new Connection();
        this.tcpClient = tcpClient;
    }
    process(parsedMessage) {
        console.log('received Processing message:', parsedMessage);

        switch(parsedMessage.Command) {
            case 'SOCKET_ENABLE':
                this.enableSocket(parsedMessage);
                break;
            case 'REPORT_SVC_INFO':
                break;
            case 'NOTIFY':
                break;
            case 'EVENT_EMERGENCY':
                break;
            case 'REQUEST_INIT_INFO':
                break;
            default:
                console.log('uncategorized command:', parsedMessage.Type);
                console.log('uncategorized command:', parsedMessage.Command);
                console.log('uncategorized command:', parsedMessage.From);
                console.log('uncategorized command:', parsedMessage.To);
                console.log('uncategorized command:', parsedMessage.Data);
        }
    }

    processFromSocket(command) {
        switch(command) {
            case 'SOCKET_DISABLE':
                this.disableSocket();
                break;
            default:
                console.log('Unknown command:', command);
            }
    }
    enableSocket(parsedMessage) {
        console.log('Enabling socket with data:', parsedMessage.Data);
        this.connection.ims_connected = true;

        const e_msg = {
            Type: 'REQUEST',
            Command: 'REQUEST_INFO',
            Token: Configurator.generateToken(),
            From: Configurator.getName(),
            To: 'IMS', // info.name에 해당하는 값
            Data: Configurator.getName()
        };

        // 메시지 전송
        const msgSender = new MsgSender(this.tcpClient);
        msgSender.parseAndSend(e_msg);
    }

    disableSocket(parsedMessage) {
        console.log('Enabling socket with data:', parsedMessage);
        this.connection.ims_connected = false;
    }
}

module.exports = DataProcessor;