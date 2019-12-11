const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;

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
      zipcode: "12345",
      latitude: "222",
      longitude: "444"
  }  
  
  const user2 = {
      username: "username2",
      password: "password2",
      firstname: "firstname2",
      lastname: "lastname2",
      email: "email2@gmail",
      phone: "222-123-4567",
      zipcode: "12345",
      latitude: "222",
      longitude: "444"
  }  
  
  const user3 = {
      username: "username1",
      password: "password1",
      firstname: "firstname1",
      lastname: "lastname1",
      email: "email3@gmail.com",
      phone: "333-123-4567",
      zipcode: "12223",
      latitude: "222",
      longitude: "444"
  }
   
  await users.create(user1.username, user1.password, user1.firstname, user1.lastname, user1.email, user1.phone, user1.zipcode, user1.latitude, user1.longitude);
  await users.create(user2.username, user2.password, user2.firstname, user2.lastname, user2.email, user2.phone, user2.zipcode, user2.latitude, user2.longitude);
  await users.create(user3.username, user3.password, user3.firstname, user3.lastname, user3.email, user3.phone, user3.zipcode, user3.latitude, user3.longitude);

  console.log("Done seeding database");

  await db.serverConfig.close();
}

main();