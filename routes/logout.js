const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;

router.get("/", async (req, res) => {
  // expire AuthCookie for session id
  // res.clearCookie('AuthCookie');

  // delete session id from user
  // const userObj = await users.removeSessionFromUser(req.sessionID);

  res.render('user/logout'); //, {title: "Log out successful"});
});

module.exports = router;