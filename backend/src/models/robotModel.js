const db = require('../database');

function getAllRobots(callback) {
    db.all("SELECT * FROM robot", [], (err, rows) => {
        if (err) {
            throw err;
        }
        callback(rows);
    });
}

function addRobot(name, status, section2Text, section3Text) {
    const stmt = db.prepare("INSERT INTO robot (name, status, section2Text, section3Text) VALUES (?, ?, ?, ?)");
    stmt.run(name, status, section2Text, section3Text);
    stmt.finalize();
}

module.exports = {
    getAllRobots,
    addRobot
};