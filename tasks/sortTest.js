const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;

async function main() {
  const db = await dbConnection();

  try{
    let userMap = await users.sortStudentsByAvailability();
    let userByZipMap = await users.sortStudentsByLocation();
    console.log(userMap);
    console.log(userByZipMap);
  }
  catch(e)
  {
    console.log(e);
  }
  finally
  {
    await db.serverConfig.close();
  }
}

main();