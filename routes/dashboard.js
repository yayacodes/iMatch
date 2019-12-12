const express = require('express');
const router = express.Router();
const userMethods = require("../data/users.js");

router.get('/', async (req, res) => {
    try {
        //authorize user (check if the current session id exists in any user's validSessionIDs array)
        var authorized = false;
        let sessID = req.session.id;
        let allUsers = await userMethods.getUsers();
        
        for (var i = 0; i < allUsers.length; i++) {
            allUsers[i].validSessionIDs.forEach(function(validID){
                if(validID == sessID){
                    authorized = true;
                }
            });
        }
        if authorized {
            res.render('user/dashboard');
        } else {
            res.render('user/login', { error: "Incorrect username and/or password. Try again" });
        }
        
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

module.exports = router;
