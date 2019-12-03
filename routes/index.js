const userRoutes = require("./users.js");
const dashboardRoutes = require("./dashboard");
const userMethods = require("../data/users.js"); //just required this for testing purposes

const constructorMethod = app => {
  app.use("/users", userRoutes);
  app.use("/dashboard", dashboardRoutes);

  app.get("/", async (req, res) => {
    // either show static welcome page or redirect
    //res.render('layouts/main');
  });

  //for some reason, when I put the app.get('/login') here it works and renders the login page (or any of the other methods for that matter).
  //but when I put it in the users.js folder and try and access it from userRoutes it does not find it
  //(YA)
  /* ***************** */

  app.get('/register', async (req, res) => {
    try {
      res.render('user/register');
    }
    catch (e) {
      res.sendStatus(404).json({ error: e });
    }
  });


  app.get('/login', async (req, res) => {
    try {
      res.render('user/login');
    }
    catch (e) {
      res.sendStatus(404).json({ error: e });
    }
  });

  app.post('/dashboard', async (req, res) => {
    let requestData = req.body;
    console.log(requestData); //this is just for us to see obviously we shouldn't log userinfo.
    try {
      let login = await userMethods.verifyUser(requestData.username, requestData.password);

      if (login === true) {
        console.log("User Is Authenticated");
        //update user authentication

        //copied this from Lab10. Feel free to correct
        app.use(session({
          name: 'AuthCookie',
          secret: 'some secret string!',
          resave: false,
          saveUninitialized: true,
          maxAge: 24 * 60 * 60 * 1000
        }));

        //after successfully verifying user, redirect to dashboard page using GET
        res.redirect('/dashboard');
      }
      else {
        res.render('user/login', { error: "Incorrect username and/or password. Try again" });
      }
    } catch (e) {
      console.log(e);
    }
  });


  app.get('/dashboard', async (req, res) => {
    try {
      res.render('/user/dashboard.hbs')
    } catch (e) {
      res.sendStatus(404).json({ error: e });
    }
  });

  //after user fills out register form we POST to signup which will just check if they were correctly added or not
  app.post('/signup', async (req, res) => {
    let requestData = req.body;
    try {
      let addUser = await userMethods.create(requestData.username, requestData.password, requestData.firstname, requestData.lastname, requestData.email, requestData.phone, requestData.zipcode);
      if(addUser === true){
        res.redirect('/profile'); //upon successfull add, we redirect the user to their newly created profile.
      }
      else{
        res.render('user/register', { error: "There was an error in your registration, please try again"});
      }
    } catch (e) {
      res.sendStatus(404).json({ error: e });
    }
  });


  app.get('/profile', async (req, res) => {
    try {
      res.render('/user/profile.hbs')
    } catch (e) {
      res.sendStatus(404).json({ error: e });
    }
  });


  /* ****************** */

  app.get("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;