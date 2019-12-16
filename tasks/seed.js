const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;
const courses = data.courses;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();
    
  const user1 = {
      username: "username1",
      password: "password1",
      firstname: "firstname1",
      lastname: "lastname1",
      email: "email1@gmail.com",
      phone: "111-123-4567",
      zipcode: "07030",
      latitude: "40.744052",
      longitude: "-74.0270745",
      grouped: "false",
      availability: ['Tuesday', 'Thursday', 'Friday']
  }  
  
  const user2 = {
      username: "username2",
      password: "password2",
      firstname: "firstname2",
      lastname: "lastname2",
      email: "email2@gmail",
      phone: "222-123-4567",
      zipcode: "07030",
      latitude: "40.744052",
      longitude: "-74.0270745",
      grouped: "false",
      availability: ['Monday', 'Wednesday', 'Saturday']
  }  
  
  const user3 = {
      username: "username3",
      password: "password3",
      firstname: "firstname3",
      lastname: "lastname3",
      email: "email3@gmail.com",
      phone: "333-123-4567",
      zipcode: "90017",
      latitude: "34.054379",
      longitude: "-118.267281",
      grouped: "false",
      availability: ['Monday', 'Tuesday']
  }

  const user4 = {
      username: "username4",
      password: "password4",
      firstname: "firstname4",
      lastname: "lastname4",
      email: "email4@gmail.com",
      phone: "444-123-4567",
      zipcode: "19107",
      latitude: "39.950802",
      longitude: "-75.160118",
      grouped: "false",
      availability: ['Tuesday', 'Thursday', 'Friday']
  } 
   
  await users.create(user1.username, user1.password, user1.firstname, user1.lastname, user1.email, user1.phone, user1.zipcode, user1.latitude, user1.longitude, user1.availability);
  await users.create(user2.username, user2.password, user2.firstname, user2.lastname, user2.email, user2.phone, user2.zipcode, user2.latitude, user2.longitude, user2.availability);
  await users.create(user3.username, user3.password, user3.firstname, user3.lastname, user3.email, user3.phone, user3.zipcode, user3.latitude, user3.longitude, user3.availability);
  await users.create(user4.username, user4.password, user4.firstname, user4.lastname, user4.email, user4.phone, user4.zipcode, user4.latitude, user4.longitude, user4.availability);

  const course1 = {
    name: "web programming",
    groupSize: 4
  }

  await courses.addCourse(course1.name, course1.groupSize);

  console.log("Done seeding database");

  await db.serverConfig.close();
}

main();
