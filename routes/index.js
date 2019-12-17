const userRoutes = require("./users");
const dashboardRoutes = require("./dashboard");
const registerRoutes = require("./register");
const profileRoutes = require("./profile");
const loginRoutes = require("./login");
const logoutRoutes = require("./logout");
const courseRoutes = require("./courses");
const profRoutes = require("./professor");

const constructorMethod = app => {
  app.use("/users", userRoutes);
  app.use("/dashboard", dashboardRoutes);
  app.use("/register", registerRoutes);
  app.use("/profile", profileRoutes);
  app.use("/login", loginRoutes);
  app.use("/logout", logoutRoutes);
  app.use("/courses", courseRoutes);
  app.use("/professor", profRoutes);

  app.get("/", async (req, res) => {
    res.render('layouts/home');
  });

  // This will return 404 error for all other invalid routes (URLs)
  app.get("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
