const mongoCollections = require('../config/mongoCollections');
const courses = mongoCollections.courses;
const uuid = require('uuid/v4');

module.exports = {
  // adds a course to the db, this will be pre-populated by the "professor" or "system"
  async addCourse(courseName, courseType) {
    // error check
    if(courseType.length === 0) throw "you must provide a valid courseType";
    // get users collection
    const coursesCollection = await courses();

    // check if username exists


    const courseId = uuid();

    let newCourse = {
      _id: userId,
      username: username,
      hashedPassword: hash,
      profile: {
        id: userId,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        zipcode: zipcode,
        latitude: latitude,
        longitude: longitude,
        grouped: 'false',
        title: "student",
        course: [],
        availability: [],
        meetings: []
      },
      validSessionIDs: []
    };

    const insertInfo = await coursessCollection.insertOne(newCourse);
    if (insertInfo.insertedCount === 0) throw "failed to add new course";
    
    const newCourseId = insertInfo.insertedId;
    
    const courses = await this.get(newCourseId);

    return courses;
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
  async updateCourse() {
     if (!id) throw "You must provide an id to search for";

    if (!courseName) throw "Provide an course name";

    if (!animalType || !Array.isArray(courseType))
      throw "You must provide an array of courseType";

    if (courseType.length === 0) throw "You must provide at least one course.";

    const coursesCollection = await courses();
    const updatedCourse = {
      courseName: name,
      courseType: courseType
    };

    const updateInfo = await courseCollection.replaceOne({ _id: id }, updatedCourse);
    if (updatedInfo.modifiedCount === 0) {
      throw "could not update course successfully";
    }

    return await this.getUserById(id);
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
