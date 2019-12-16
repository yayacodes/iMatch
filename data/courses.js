const mongoCollections = require('../config/mongoCollections');
const courses = mongoCollections.courses;
const uuid = require('uuid/v4');

module.exports = {
  // adds a course to the db, this will be pre-populated by the "professor" or "system"
  async addCourse(courseName, groupSize) {
    // error check
    if (typeof courseName !== 'string') throw "must provide a valid course name (string)";
    if (typeof groupSize !== 'number') throw 'must provide a valid group size (number)'
    // get users collection
    const coursesCollection = await courses();

    // check if username exists

    const courseId = uuid();

    let newCourse = {
      _id: courseId,
      name: courseName,
      groupSize: groupSize,
      students: [],
      groups: []
    };

    const insertInfo = await coursesCollection.insertOne(newCourse);
    if (insertInfo.insertedCount === 0) throw "failed to add new course";
    
    return await this.getCourseById(insertInfo.insertedId);
  },

  // returns a list of all courses in the database
  async getCourses() {
    // get courses collection
    const coursesCollection = await courses();

    // empty query to omit any searching/filtering
    // find() operation returns dbCursor which is converted to data with toArray() 
    const allCourses = await coursesCollection.find({}).toArray();
    if (!allCourses) throw "no courses in database";
    return allCourses;
  },

  // returns course matching the given id
  async getCourseById(id) {
    if (!id) throw "id not specified";

    const coursesCollection = await courses();
    // findOne() takes object representing query to perform
    const oneCourse = await coursesCollection.findOne({ _id: id });
    if (!oneCourse) throw `failed to find course with id: ${id}`;

    return oneCourse;
  },

  // updates course attributes such as groupSize
  async updateCourse(courseName, groupSize) {
     if (!id) throw "You must provide an id to search for";

    if (!courseName) throw "Provide an course name";

    if (!groupSize || !Array.isArray(groupSize))
      throw "You must provide an array of courseType";

    if (courseName.length === 0) throw "You must provide at least one course.";

    const coursesCollection = await courses();
    const updatedCourse = {
      name: courseName,
      groupSize: groupSize
    };

    const updateInfo = await courseCollection.replaceOne({ _id: id }, updatedCourse);
    if (updatedInfo.modifiedCount === 0) {
      throw "could not update course successfully";
    }

    return await this.getCourseById(id);
},

  // adds a group to course, called via algorithm that matches students
  // based on courses and creates a valid group
  async addGroupToCourse() {

  },

  // removes a group from course
  async removeGroupFromCourse() {

  },

  // updates a group in course, called via algorithm that matches students
  // will be called when a user removes a course from his schedule
  async updateGroup() {

  }
}
