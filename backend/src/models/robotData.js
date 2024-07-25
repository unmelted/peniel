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
        this.tool_orientation = -1;
    }
}

class Robot {
    constructor(id, version) {
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
}

class Connection {
    constructor() {
        this.ims_connected = false;
        this.web_connected = false;
    }
}

module.exports = { Robot, RobotArm, Connection };