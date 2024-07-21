const Robot = require('../models/robotData');

exports.getAllRobots = (req, res) => {
    Robot.getAllRobots((robots) => {
        res.json(robots);
    });
};

exports.addRobot = (req, res) => {
    const { name, status, section2Text, section3Text } = req.body;
    Robot.addRobot(name, status, section2Text, section3Text);
    res.status(201).send('Robot added');
};