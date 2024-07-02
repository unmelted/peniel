const express = require('express');
const router = express.Router();

// 여기에 /notify/ 관련 라우트 정의
router.get('/notify', (req, res) => {
    res.send('Notify API');
});

module.exports = router;
