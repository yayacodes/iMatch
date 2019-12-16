const express = require('express');
const router = express.Router();
const userMethods = require("../data/users.js");
const courseMethods = require("../data/courses.js");
const sortMethods = require("../data/sort_algorithm.js");

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

            res.render('user/professor', {
              username: authUser.username, 
              firstname: authUser.profile.firstname,
              lastname: authUser.profile.lastname,
              email: authUser.profile.email,
              phone: authUser.profile.phone,
              course: courses});
            
        } else {
            res.render('user/login', { error: "Incorrect username and/or password. Try again" });
        }
        
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.post('/', async (req, res) => {
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
            if (!req.body.course_name) {
                res.status(401).render('user/professor',{ error: "Please provide the name of the course you want to sort groups"});
                return;
            } 
            
            const courses = courseMethods.getCourses();
            var chosenCourse = null;
            
            //look for course with given course name
            for (var i = 0; i < courses.length; i++) {
                if (courses[i].name === req.body.course_name) {
                    chosenCourse = courses[i]
                }
            }
            if (!chosenCourse) {
                res.status(401).render('user/professor',{ error: "No course with that name found"});
                return;
            } 
            
            //call the sorting algorithm
            await sortMethods.groupUsersByStrictAvailability(chosenCourse.groupSize);
            
        } else {
            res.render('user/login', { error: "Incorrect username and/or password. Try again" });
        }
        
    } catch (e) {
        res.status(404).json({ error: e });
    }
});




module.exports = router;
