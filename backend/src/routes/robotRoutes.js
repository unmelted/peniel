const express = require('express');
const router = express.Router();
const robotController = require('../controllers/robotController');

router.get('/robots', robotController.getAllRobots);
router.post('/robots', robotController.addRobot);

module.exports = router;