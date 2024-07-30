
const { Robot, RobotArm, Connection } = require('../models/robotData');
const {Configurator, MsgSender, TcpClient} = require("./tcpService");
const {sendRobotData, sendEventLog, sendOtherData} = require('./webSocket');

class DataProcessor {
    constructor(tcpClient, wss) {
        this.robots = new Map(); // 로봇 데이터를 저장할 맵
        this.connection = new Connection();
        this.tcpClient = tcpClient;
        this.wss = wss;
    }
    process(parsedMessage) {
        console.log('received Processing message:', parsedMessage);

        switch(parsedMessage.Command) {
            case 'SOCKET_ENABLE':
                this.enableSocket(parsedMessage);
                break;

            case 'SET_SVC_INFO':
                try {
                    const robot_data = JSON.parse(parsedMessage.Data);
                    const robot_name = this.getRobotName(parsedMessage);
                    const robot = this.robots.get(robot_name);

                    if (!robot) {
                        // 로봇이 맵에 없으면 새로 생성
                        robot = new Robot(robot_name);
                        this.robots.set(robot_name, robot);
                    }

                    robot.updateRobotArms(robot_data);
                    parsedMessage.Type = "EVENT_INFO";
                } catch (error) {
                    console.error('Error parsing robot data:', error);
                }

                break;

            case 'REQUEST_INIT_INFO':
                this.addRobot(parsedMessage.From, parsedMessage.Data);
                break;

            case 'REQUEST_INFO':
                break;

            case 'WHOAMI':
            case 'NOTIFY':
            case 'REPORT_SVC_INFO':
            case 'EVENT_EMERGENCY':
                // bypass to web
                parsedMessage.Type = "EVENT_LOG";
                this.broadcastEvent(parsedMessage);
                // sendEventLog(this.wss, parsedMessage);
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

    disableSocket() {
        console.log('socket is disabled');
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

    getRobotName(message) {
        for (let key in message) {
            if (key.startsWith('MC')) {
                return 'MC';
            }
            else if (key.startsWith('SR1')) {
                return 'SR1';
            }
            else if (key.startsWith('SR2')) {
                return 'SR2';
            }
            else if (key.startsWith('SR3')) {
                return 'SR3';
            }
            else if (key.startsWith('SR4')) {
                return 'SR4';
            }
            else if (key.startsWith('CR')) {
                return 'CR';
            }
        }
        return null;
    }

    broadcastEvent(message) {
        this.wss.clients.forEach(client => {
            if (client.readyState === client.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    }
}

module.exports = DataProcessor;