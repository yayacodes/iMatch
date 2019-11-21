const userRoutes = require("./users");
const dashboardRoutes = require("./dashboard");

const constructorMethod = app => {
  app.use("/users", userRoutes);
  app.use("/dashboard", dashboardRoutes);

  app.get("/", async (req, res) => {
    // either show static welcome page or redirect
  });

  app.get("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;