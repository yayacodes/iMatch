const express = require('express');
const router = express.Router();
const userMethods = require("../data/users.js");
const courseMethods = require("../data/courses.js");

router.get('/', async (req, res) => {
    try {
        //authorize user (check if the current session id exists in any user's validSessionIDs array)
        var authorized = false;
        var authUser = null;
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
        if (authorized) {
            const courses = courseMethods.getCourses();
            
          
//             const authUserData = {
//                 userID: authUser.username,
//                 location: {lat: authUser.profile.latitude, lng:authUser.profile.longitude},
//                 course: authUser.profile.course[0],
//                 group: groupName
//             };

            res.render('user/professor', {
              username: authUser.username, 
              firstname: authUser.profile.firstname,
              lastname: authUser.profile.lastname,
              email: authUser.profile.email,
              phone: authUser.profile.phone,
              course: courses,
              
            
            });
        } else {
            res.render('user/login', { error: "Incorrect username and/or password. Try again" });
        }
        
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

module.exports = router;
