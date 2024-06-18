const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('robot_data.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS robot (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            status TEXT,
            section2Text TEXT,
            section3Text TEXT
        )
    `);
});

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