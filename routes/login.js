const express = require('express');
const router = express.Router();
const userMethods = require("../data/users.js");

router.get('/', async (req, res) => {
    try {
        res.render('user/login');
    }
    catch (e) {
        res.sendStatus(404).json({ error: e });
    }
});

router.post('/', async (req,res) => {
    if (!req.body.username && !req.body.password) {
        res.status(401).render('user/login',{ error: "Please provide both a valid username and a valid password"});
        return;
    }
    try {
        const inputUser = await userMethods.getUserByUsername(req.body.username);
        
        if (!inputUser) {
            res.status(401).render('user/login', { error: "Error: Incorrect username and/or password"});
            return;
        }
        
        let verifyUser = await userMethods.verifyUser(req.body.username, req.body.password, req.session.id);
        
        if (verifyUser) {
            req.session.loginStatus = true;
            if (inputUser.role === 'student'){
                res.redirect('/dashboard');
            } else if (inputUser.role === 'professor'){
                res.redirect('/professor');
            }
        } else {
            res.status(401).render("user/login", { error: "Cannot verify user"});
            return;
        }
    } catch (e) {
        res.status(500).render("user/login", {error: e})
    }
});
module.exports = router;
