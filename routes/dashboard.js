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
            res.render('user/login');
        }
        
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.post('/', async (req, res) => {
    let requestData = req.body;
    console.log(requestData); //this is just for us to see obviously we shouldn't log userinfo.
    try {
        //i think this is authorization rather than authentication, so instead of calling verifyUser i would check on validSessionIDs like in GET above (Hien)  
        let login = await userMethods.verifyUser(requestData.username, requestData.password, req.session.id);

        if (login === true) {
            console.log("User Is Authenticated");
            //update user authentication

            //copied this from Lab10. Feel free to correct
            app.use(session({
                name: 'AuthCookie',
                secret: 'some secret string!',
                resave: false,
                saveUninitialized: true,
                maxAge: 24 * 60 * 60 * 1000
            }));

            //after successfully verifying user, redirect to dashboard page using GET
            res.redirect('/');
        }
        else {
            res.render('user/login', { error: "Incorrect username and/or password. Try again" });
        }
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
