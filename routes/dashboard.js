const express = require('express');
const router = express.Router();
const userMethods = require("../data/users.js");

router.get('/', async (req, res) => {
    try {
        //authorize user (check if the current session id exists in any user's validSessionIDs array)
        let authorized = false;
        let authUser = null;
        let sessID = req.session.id;
        let allUsers = await userMethods.getUsers();

        for (var i = 0; i < allUsers.length; i++) {
          allUsers[i].validSessionIDs.forEach(function(validID){
            if(validID == sessID){
              authorized = true;
              authUser = allUsers[i];
            }
          });
        }
        if (authorized && authUser.role === 'student') {
            const groupName = await userMethods.getUserGroupName(authUser._id);
            const coursename = await userMethods.getUserCourse(authUser._id);
            const locations = await userMethods.getGroupLocations(authUser._id);

            const authUserData = {
                userID: authUser.username,
                location: {lat: authUser.profile.latitude, lng:authUser.profile.longitude},
                course: coursename,
                group: groupName,
                memberLocation: locations
            };

            res.render('user/dashboard', {userData: authUserData});
        } else if (authorized && authUser.role === 'professor') {
            res.redirect('/professor');
        } else {
            res.render('user/login', { error: "Incorrect username and/or password. Try again" });
        }
        
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

module.exports = router;
