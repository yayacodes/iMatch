const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;


router.get('/', async (req, res) => {
    try {
        res.render('user/register');
    }
    catch (e) {
        res.sendStatus(404).json({ error: e });
    }
});

//after user fills out register form we POST to signup which will just check if they were correctly added or not
router.post('/signup', async (req, res) => {
    let requestData = req.body;
    try {
        let addUser = await userData.create(requestData.username, 
            requestData.password, requestData.firstname, 
            requestData.lastname, requestData.email, requestData.phone, 
            requestData.zipcode, requestData.latitude, requestData.longitude,
            requestData.availability);

        if (addUser === true) {
            res.redirect('/profile'); //upon successfull add, we redirect the user to their newly created profile.
        }
        else {
            res.render('user/register', { error: "There was an error in your registration, please try again" });
        }
    } catch (e) {
        res.sendStatus(404).json({ error: e });
    }
});

module.exports = router;