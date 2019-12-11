const express = require('express');
const router = express.Router();
const userMethods = require("../data/users.js");

//after user fills out register form we POST to signup which will just check if they were correctly added or not
router.post('/', async (req, res) => {
    let requestData = req.body;
    try {

        let addUser = await userMethods.create(requestData.username, requestData.password, requestData.firstname, requestData.lastname, requestData.email, requestData.phone, requestData.zipcode, requestData.latitude, requestData.longitude);

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

