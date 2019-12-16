const uuid = require('uuid/v4');
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;

// Splits an array into n elements
function splitArray(a, n, balanced) {
    
    if (n < 2)
        return [a];

    let len = a.length;
    let out = [];
    let i = 0;
    var size;

    if (len % n === 0) {
        size = Math.floor(len / n);
        while (i < len) {
            out.push(a.slice(i, i += size));
        }
    }

    else if (balanced) {
        while (i < len) {
            size = Math.ceil((len - i) / n--);
            out.push(a.slice(i, i += size));
        }
    }

    else {

        n--;
        size = Math.floor(len / n);
        if (len % size === 0)
            size--;
        while (i < size * n) {
            out.push(a.slice(i, i += size));
        }
        out.push(a.slice(size * n));

    }

    return out;
}

// Form groups of users strictly by availability
module.exports = {
  async groupUsersByStrictAvailability(maxGroupSize) {
    
    if(isNaN(maxGroupSize))
    {
      throw 'Max maxGroupSize must be a number';
    }

    const db = await dbConnection();

    try{

      // Sort users by availability and by zip code
      let userMap = await users.sortStudentsByAvailability();
      let groupNameStr = "Group_";

      if(Object.keys(userMap).length === 0)
      {
        throw 'something went wrong while sorting students into groups';
      }

      // After this first pass can any users be grouped based on an 
      // exact availability match
      let userMapKeys = Object.keys(userMap);
      let groupCounter = 1;
      for(i = 0; i < userMapKeys.length; i++)
      {
        let key = userMapKeys[i];
        let value = userMap[key];
        if(value.length > 1 && value.length <= maxGroupSize)
        {
            // Create a new group object
            let groupID = uuid();
            let groupName = groupNameStr + groupCounter;
            let groupObj = 
            {
              _id: groupID,
              groupname: groupName,
            };

            groupCounter++;

            // Add the group information to the user
            for(j = 0; j < value.length; j++)
            {
              let user = value[j];
              let updatedUser = await users.updateUserGroup(user._id, groupObj);

              if(!updatedUser) 
              {
                throw 'error updating users group information';
              }
            }
        }
        else if(value.length > 1 && value.length > maxGroupSize)
        {
            // Slpit the value array into multiple arrays
            let balancedSplit = true;
            if(maxGroupSize % 2 != 0 || value.length % 2 != 0)
            {
              balancedSplit = false;
            }

            let splitArr = splitArray(value, maxGroupSize, balancedSplit);
            
            // Each element in the split array is a group
            for(k = 0; k < splitArr.length; k++)
            {
                // Create a new group object
                let groupID = uuid();
                let groupName = groupNameStr + groupCounter;
                let groupObj = 
                {
                  _id: groupID,
                  groupname: groupName,
                };

                groupCounter++;

                let usrArray = splitArr[k];

                // Add the group information to the user
                for(m = 0; m < usrArray.length; m++)
                {
                  let user = usrArray[m];
                  let updatedUser = await users.updateUserGroup(user._id, groupObj);

                  if(!updatedUser) 
                  {
                    throw 'error updating users group information';
                  }
                }
            }
        }
      }
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
}