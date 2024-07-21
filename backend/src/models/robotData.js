const db = require('../database');

class RobotArm {
    constructor(status, is_able_to_track, hits_joint_limit, azimuth, setup_pitch, drape_attached, trocar_attached, trocar_type, camera_attached, camera_lens_tilt_angle, instrument_attached, instrument_type, instrument_usage_count, instrument_scaled_grip, tool_orientation) {
        this.status = status;
        this.is_able_to_track = is_able_to_track;
        this.hits_joint_limit = hits_joint_limit;
        this.azimuth = azimuth;
        this.setup_pitch = setup_pitch;
        this.drape_attached = drape_attached;
        this.trocar_attached = trocar_attached;
        this.trocar_type = trocar_type;
        this.camera_attached = camera_attached;
        this.camera_lens_tilt_angle = camera_lens_tilt_angle;
        this.instrument_attached = instrument_attached;
        this.instrument_type = instrument_type;
        this.instrument_usage_count = instrument_usage_count;
        this.instrument_scaled_grip = instrument_scaled_grip;
        this.tool_orientation = tool_orientation;
    }
}

class Robot {
    constructor(id, service_status, body_status, arms) {
        this.id = id;
        this.service_status = service_status;
        this.body_status = body_status;
        this.arms = arms;
    }
}

class Connection {
    constructor() {
        this.ims_connected = false;
        this.web_connected = false;
    }
}

module.exports = { Robot, RobotArm, Connection };