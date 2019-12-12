const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');

const saltRounds = 16;

module.exports = {
  // **** General functions ****
  // create new user when someone registers
  async create(username, password, firstname, lastname, email, phone, zipcode, latitude, longitude) {
    // error check

    // Blank zip, latitude, or longitude
    if (zipcode == '' || latitude == '' || longitude == '') {
      throw "Registration failed: Invalid zip code";
    }

    // get users collection
    const usersCollection = await users();

    // check if username exists


    // hash password with bcrypt
    const hash = await bcrypt.hash(password, saltRounds);
    const userId = uuid();

    let newUser = {
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

    const insertInfo = await usersCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) throw "failed to add new user";

    return await this.getUserById(insertInfo.insertedId);
  },

  // returns a list of all users in the database
  async getUsers() {
    // get users collection
    const usersCollection = await users();

    // empty query to omit any searching/filtering
    // find() operation returns dbCursor which is converted to data with toArray() 
    const allUsers = await usersCollection.find({}).toArray();
    if (!allUsers) throw "no users in database";
    return allUsers;
  },

  // returns user matching the given id
  async getUserById(id) {
    if (!id) throw "id not specified";

    const usersCollection = await users();
    // findOne() takes object representing query to perform
    const oneUser = await usersCollection.findOne({ _id: id });
    if (!oneUser) throw `failed to find user with id: ${id}`;

    return oneUser;
  },

  // returns an array of users by zip code
  async getUsersByZip(zipCode) {
    if (!zipCode) throw 'zip code not specified';

    const userCollection = await users();
    const usersByZip = await userCollection.find({ zipcode: zipCode }).toArray();

    if (!usersByZip) throw `failed to find user with zip: ${zipCode}`;

    return usersByZip;
  },

  // remove user with the given id from database
  async remove(id) {
    if (!id) throw "id not specified";

    const usersCollection = await users();
    const userQuery = await this.getUserById(id);

    const removalInfo = await usersCollection.removeOne({ _id: id });
    if (removalInfo.deletedCount === 0) throw `failed to remove user with id: ${id}`;

    let removedUser = {
      deleted: true,
      data: userQuery
    }

    return removedUser;
  },

  // update user profile info
  async updateUser(id, firstname, lastname, email, phone, zipcode) {

  },

  // adds a course to user, called via update schedule form
  async addCourseToUser(userId, courseId) {

  },

  // removes a course from user, called via update schedule form
  async removeCourseFromUser(userId, courseId) {

  },

  // add availability to user, called via update schedule form
  async addAvailabilityToUser(userId, availDay) {

  },

  // removes availability from user, called via update schedule form
  async updateAvailability(userId, availDay) {

  },

  // adds a meeting to user, this will be called after algorithm matches a group
  // and finds a common meeting time/place
  async addMeetingToUser(userId, meetingId, meetingTitle) {

  },

  // removes a meeting from user, this will be called after user removes a course
  async removeMeetingFromUser(userId, meetingId) {

  },

  // **** Security-related functions ****
  // verify username and password using bcrypt when logging in
  async verifyUser(userName, password) {
    //search for user with username in db
    const usersCollection = await users();
    const oneUser = await usersCollection.findOne({ username: userName });
    if (!oneUser) throw 'Failed to find user with that username';

    //check if passwords are the same
    let samePass = await bcrypt.compare(password, oneUser.hashedPassword);
    if (samePass) {
      req.session.loginStatus = true; //you get an error here when you test the program
      //update validSessionIDs array of user in the db
    }

  },

  async addSessionToUser(username, sessionId) {

  },

  async removeSessionFromUser(sessionId) {

  },

  async getUserBySessionId(sessionId) {

  }

}
