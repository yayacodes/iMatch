const express = require("express");
const router = express.Router();
const data = require("../data");
const userMethods = require("../data/users.js");

router.get("/", async (req, res) => {
  try {
    // expire AuthCookie for session id
    // res.clearCookie('AuthCookie');

    // delete session id from user
    await userMethods.removeSessionFromUser(req.session.id);
      
    req.session.destroy(function(err){
              if(err){
                  throw err;
              }
          });
    res.render('user/logout'); //, {title: "Log out successful"});
  } catch(e) {
    res.status(500).send;
  }
});

module.exports = router;
