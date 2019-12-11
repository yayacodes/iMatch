const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.render('user/login');
    }
    catch (e) {
        res.sendStatus(404).json({ error: e });
    }
});

module.exports = router;