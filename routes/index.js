const userRoutes = require("./users");
const dashboardRoutes = require("./dashboard");
const registerRoutes = require("./register");
const profileRoutes = require("./profile");
const loginRoutes = require("./login");

const constructorMethod = app => {
  app.use("/users", userRoutes);
  app.use("/dashboard", dashboardRoutes);
  app.use("/register", registerRoutes);
  app.use("/profile", profileRoutes);
  app.use("/login", loginRoutes);

  app.get("/", async (req, res) => {
    // either show static welcome page or redirect
    //res.render('layouts/main');
  });

  // This will return 404 error for all other invalid routes (URLs)
  app.get("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
