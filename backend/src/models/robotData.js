const db = require('../database');

class RobotArm {
    constructor() {
        this.status = -1;
        this.is_able_to_track = -1;
        this.hits_joint_limit = -1;
        this.azimuth = -1;
        this.setup_pitch = -1;
        this.drape_attached = -1;
        this.trocar_attached = -1;
        this.trocar_type = -1;
        this.camera_attached = -1;
        this.camera_lens_tilt_angle = -1;
        this.instrument_attached = -1;
        this.instrument_type = -1;
        this.instrument_usage_count = -1;
        this.instrument_scaled_grip = -1;
        this.tool_orientation_x = -1;
        this.tool_orientation_y = -1;
        this.tool_orientation_z = -1;
        this.tool_orientation_w = -1;
    }

    updateRobotArm(robot_name, arm_index, message) {
        const prefix = `${robot_name}:${arm_index}:`;
        this.status = message[`${prefix}status`] ?? this.status;
        this.is_able_to_track = message[`${prefix}is_able_to_track`] ?? this.is_able_to_track;
        this.hits_joint_limit = message[`${prefix}hits_joint_limit`] ?? this.hits_joint_limit;
        this.azimuth = message[`${prefix}azimuth`] ?? this.azimuth;
        this.setup_pitch = message[`${prefix}setup_pitch`] ?? this.setup_pitch;
        this.drape_attached = message[`${prefix}drape_attached`] ?? this.drape_attached;
        this.trocar_attached = message[`${prefix}trocar_attached`] ?? this.trocar_attached;
        this.trocar_type = message[`${prefix}trocar_type`] ?? this.trocar_type;
        this.camera_attached = message[`${prefix}camera_attached`] ?? this.camera_attached;
        this.camera_lens_tilt_angle = message[`${prefix}camera_lens_tilt_angle`] ?? this.camera_lens_tilt_angle;
        this.instrument_attached = message[`${prefix}instrument_attached`] ?? this.instrument_attached;
        this.instrument_type = message[`${prefix}instrument_type`] ?? this.instrument_type;
        this.instrument_usage_count = message[`${prefix}instrument_usage_count`] ?? this.instrument_usage_count;
        this.instrument_scaled_grip = message[`${prefix}instrument_scaled_grip`] ?? this.instrument_scaled_grip;
        this.tool_orientation_x = message[`${prefix}tool_orientation_x`] ?? this.tool_orientation_x;
        this.tool_orientation_y = message[`${prefix}tool_orientation_y`] ?? this.tool_orientation_y;
        this.tool_orientation_z = message[`${prefix}tool_orientation_z`] ?? this.tool_orientation_z;
        this.tool_orientation_w = message[`${prefix}tool_orientation_w`] ?? this.tool_orientation_w;
    }
}

class Robot {
    constructor(id, version ="abcde") {
        this.id = id;
        this.name = id.split("_")[0];
        this.version = version;
        this.arms = [];
        console.log("Robot constructor ", this.name, this.version);
    }

    addArm(arm) {
        this.arms.push(arm);
    }

    getArm(index) {
        return this.arms[index];
    }

    getArmCount() {
        return this.arms.length;
    }

    addArmWithDefault(arm_count) {
        for (let index = 0 ; index < arm_count ; index++) {
            this.arms.push(new RobotArm);
        }
    }

    updateRobotArms(message) {
        console.log("updateRobotArm is called : ", message, this.arms.length);

        for (let arm_index = 0; arm_index < this.arms.length; arm_index++) {

            if (!this.arms[arm_index]) {
                this.arms[arm_index] = new RobotArm();
            }
            this.arms[arm_index].updateRobotArm(this.name, arm_index, message);
            console.log("updateRobotArm : ", this.name, arm_index, this.arms[arm_index]);
        }
    }
}

class Connection {
    constructor() {
        this.ims_connected = false;
        this.web_connected = false;
    }
}

module.exports = { Robot, RobotArm, Connection };