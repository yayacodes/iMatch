const express = require("express");
const router = express.Router();
const data = require("../data");
const userMethods = require("../data/users.js");

router.get("/", async (req, res) => {
  // expire AuthCookie for session id
  // res.clearCookie('AuthCookie');

  // delete session id from user
  var newValidSessionIDs;
  var updatedUser;
  var updatedInfo;
  const usersCollection = await users();
  let sessID = req.session.id;
  let  allUsers = await userMethods.getUsers();

  for (var i = 0; i < allUsers.length; i++) {
    //filter validSessionIDs to remove sessID
    newValidSessionIDs = allUsers[i].validSessionIDs.filter(function(validID){
        let diff = validID !== sessID;
        return diff;
      });
    if (newValidSessionIDs.length !== allUsers[i].validSessionIDs.length) { //if sessID was removed in newValidSessionIDs 
      //update validSessionIDs in the database
      updatedUser = {
        validSessionIDs: newValidSessionIDs
      };
      updatedInfo = await usersCollection.updateOne({username: allUsers[i].username}, {$set:updatedUser});
      if (updatedInfo.modifiedCount === 0) {
        throw "Could not add sessionID to user document"
      };  
    }
  }

  res.render('user/logout'); //, {title: "Log out successful"});
});

module.exports = router;
