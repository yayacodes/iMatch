const express = require('express');
const router = express.Router();
const data = require("../data");
const users = data.users;

router.get('/', async (req, res) => {
  try {
    //authorize user (check if the current session id exists in any user's validSessionIDs array)
    let authorized = false;
    let authUser = null;
    let sessID = req.session.id;
    let allUsers = await users.getUsers();
    
    for (var i = 0; i < allUsers.length; i++) {
      allUsers[i].validSessionIDs.forEach(function(validID){
        if(validID == sessID){
          authorized = true;
          authUser = allUsers[i];
        }
      });
    }
    if (authorized) {
      // const authUserData = {
      //   userID: authUser.username,
      //   location: {lat: authUser.profile.latitude, lng:authUser.profile.longitude},
      // };
      res.render('user/profile', {
        username: authUser.username,
        firstname: authUser.profile.firstname,
        lastname: authUser.profile.lastname,
        email: authUser.profile.email,
        phone: authUser.profile.phone,
        zipcode: authUser.profile.zipcode});//{userData: authUserData});
    } else {
      res.redirect('/login');
    }
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.get('/edit-profile', async(req, res) => {
  try {
    //authorize user (check if the current session id exists in any user's validSessionIDs array)
    let authorized = false;
    let authUser = null;
    let sessID = req.session.id;
    let allUsers = await users.getUsers();
    
    for (var i = 0; i < allUsers.length; i++) {
      allUsers[i].validSessionIDs.forEach(function(validID){
        if(validID == sessID){
          authorized = true;
          authUser = allUsers[i];
        }
      });
    }
    if (authorized) {
      // const authUserData = {
      //   userID: authUser.username,
      //   location: {lat: authUser.profile.latitude, lng:authUser.profile.longitude},
      // };
      res.render('user/editprofile', {
        oldFirstname: authUser.profile.firstname,
        oldLastname: authUser.profile.lastname,
        oldEmail: authUser.profile.email,
        oldPhone: authUser.profile.phone,
        oldZipcode: authUser.profile.zipcode});//{userData: authUserData});
    } else {
      res.redirect('/login');
    }
  } catch (e) {
    res.status(500).json({ error: "user database error"});
  }

});

router.post('/edit-profile', async(req, res) => {
  let newFirstname = req.body.newFirstname;
  let newLastname = req.body.newLastname;
  let newEmail = req.body.newEmail;
  let newPhone = req.body.newPhone;
  let newZipcode = req.body.newZipcode;
  let result;

  console.log(newFirstname, req.body.newFirstname);
  console.log(newLastname, req.body.newLastname);
  console.log(newEmail, req.body.newEmail);
  console.log(newPhone, req.body.newPhone);

  let authorized = false;
  let authUser = null;
  let sessID = req.session.id;
  try {
    //authorize user (check if the current session id exists in any user's validSessionIDs array)
    let allUsers = await users.getUsers();
    
    for (var i = 0; i < allUsers.length; i++) {
      allUsers[i].validSessionIDs.forEach(function(validID){
        if(validID == sessID){
          authorized = true;
          authUser = allUsers[i];
        }
      });
    }
    if (authorized) {
      // console.log(authUser._id);
      result = await users.updateUser(authUser._id, newFirstname, newLastname, newEmail, newPhone, newZipcode);
      if (result) {
        res.redirect("/profile");
      } else {
        res.status(401);
        res.redirect("/profile")
      }
      // const authUserData = {
      //   userID: authUser.username,
      //   location: {lat: authUser.profile.latitude, lng:authUser.profile.longitude},
      // };
    } else {
      res.redirect('/login');
    }
    
  } catch (err) {
    res.render("user/editprofile", {
      oldFirstname: authUser.profile.firstname,
      oldLastname: authUser.profile.lastname,
      oldEmail: authUser.profile.email,
      oldPhone: authUser.profile.phone,
      oldZipcode: authUser.profile.zipcode});//{userData: authUserData});
  }

});

router.get('*', async (req, res) => {
  res.status(404);
  res.render('user/error', {title: 'Page Error', error: 'Sorry, you have reached an invalid page.'});
});

module.exports = router;
