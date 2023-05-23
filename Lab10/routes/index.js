//Here you will import route files and export the constructor method as shown in lecture code and worked in previous labs.

import userRoutes from "./auth_routes.js";

const constructorMethod = (app) => {
  app.use("/", userRoutes);
  app.use("*", (req, res) => {
    res.status(404).json("404 : Not found");
  });
};

export default constructorMethod;
