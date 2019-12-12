const express = require('express');
const router = express.Router();
const data = require('../data');
const courseData = data.courses;

// testing DB seed
// testing DB seed
router.get('/', async (req, res) => {
  try {
    let courseList = await courseData.getCourses();
    res.json(courseList);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    let course = await courseData.getCourseById(req.params.id);
    res.json(course);
    //res.sendStatus(200);
  } catch (e) {
    res.status(404).json({error: 'course not found'});
  }
});

// PT to-do: finish implementing updating/editing courses
router.put('/:id', async (req, res) => {
  let courseInfo = req.body;

  if (!courseInfo) {
    res.status(400).json({error: 'You must provide data to update course'});
    return;
  }

  // if (!courseInfo.newFirstname && !courseInfo.newEmail) { // finish adding other checks, lastname, zip, phone, etc.. separate for individual field update?
  //   res.status(400).json({error: 'You must provide a new name or new type'});
  //   return;
  // }

  try {
    await courseData.getCourseById(req.params.id);
  } catch (e) {
    res.status(404).json({error: 'course not found'});
    return;
  }
  try {
    const updatedCourse = await courseData.updateCourse(req.params.id, courseInfo.newFirstname, courseInfo.newLastname, courseInfo.newEmail); // finish adding parameters
    res.json(updatedCourse);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;