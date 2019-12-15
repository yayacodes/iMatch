const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;

async function main() {
  const db = await dbConnection();

  try{
    let userMap = await users.sortStudentsByDay();
    console.log(userMap);
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