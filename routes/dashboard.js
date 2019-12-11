const express = require('express');
const router = express.Router();
const userMethods = require("../data/users.js");

router.get('/', async (req, res) => {
    try {
        res.render('user/dashboard');
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.post('/', async (req, res) => {
    let requestData = req.body;
    console.log(requestData); //this is just for us to see obviously we shouldn't log userinfo.
    try {
        //I'll create another function to call below instead of verifyUser because i think this is authorization rather than authentication (Hien)  
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
