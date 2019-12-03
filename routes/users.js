const express = require('express');
const router = express.Router();

router.get('/login', async (req, res) => {
    try {
        res.render('user/login');
    } catch (e) {
        res.status(500).json({ error: e});
    }
});

module.exports = router;