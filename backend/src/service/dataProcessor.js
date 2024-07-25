
const { Robot, RobotArm, Connection } = require('../models/robotData');
const {Configurator, MsgSender, TcpClient} = require("./tcpService");
const sendToWeb = require('./webSocket');

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
                const robot_data = JSON.parse(parsedMessage.Data);
                const robot_name = parsedMessage.From;
                const robot = this.robots.get(robot_name);
                robot.updateRobotArms(robot_data);
                break;

            case 'REQUEST_INIT_INFO':
                this.addRobot(parsedMessage.From, parsedMessage.Data);
                break;

            case 'REQUEST_INFO':
                break;

            case 'NOTIFY':
            case 'EVENT_EMERGENCY':
            case 'WHOAMI':
                // bypass to web
                parsedMessage.Type = "EVENT_LOG"
                this.sendToFrontend(parsedMessage);
                break;

            default:
                console.log('uncategorized command:', parsedMessage.Type);
                console.log('uncategorized command:', parsedMessage.Command);
                console.log('uncategorized command:', parsedMessage.From);
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
            To: 'IMS',
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

    addRobot(from, data) {
        const pData = JSON.parse(data);
        console.log("arm count : ", pData["arm_count"]);
        const robot = new Robot(from, pData["Version"]);
        for (let i = 0; i < pData["arm_count"]; i++) {
            robot.addArm(new RobotArm());
        }

        this.robots.set(from, robot);
    }
    updateRobot(from, data) {

    }
}

module.exports = DataProcessor;