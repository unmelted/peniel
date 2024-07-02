const express = require('express');
const router = express.Router();

// 여기에 /log/ 관련 라우트 정의
router.get('/log', (req, res) => {
    res.send('Log API');
});

module.exports = router;
