const express = require('express');
const router = express.Router();

router.get('/dashboard', async (req, res) => {
    try {
        res.render('user/dashboard');
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

module.exports = router;