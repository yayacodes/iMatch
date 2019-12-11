const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;

// testing DB seed
router.get('/', async (req, res) => {
  try {
    let userList = await userData.getUsers();
    res.json(userList);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    let user = await userData.getUserById(req.params.id);
    res.json(user);
    //res.sendStatus(200);
  } catch (e) {
    res.status(404).json({error: 'user not found'});
  }
});

// router.get('/:zipcode', async (req, res) => {
//   try {
//     let users = await userData.getUserByZip(req.params.zipcode);
//     res.json(users);
//     res.sendStatus(200);
//   } catch (e) {
//     res.status(404).json({error: 'user not found'});
//   }
// });

// PT to-do: finish implementing updating/editing user profile
router.put('/:id', async (req, res) => {
  let userInfo = req.body;

  if (!userInfo) {
    res.status(400).json({error: 'You must provide data to update user'});
    return;
  }

  if (!userInfo.newFirstname && !userInfo.newEmail) { // finish adding other checks, lastname, zip, phone, etc.. separate for individual field update?
    res.status(400).json({error: 'You must provide a new name or new type'});
    return;
  }

  try {
    await userData.getUserById(req.params.id);
  } catch (e) {
    res.status(404).json({error: 'user not found'});
    return;
  }
  try {
    const updatedUser = await userData.updateAnimal(req.params.id, userInfo.newFirstname, userInfo.newLastname, userInfo.newEmail); // finish adding parameters
    res.json(updatedAnimal);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;