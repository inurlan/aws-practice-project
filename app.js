import express from "express";
import appConfig from "./src/config/main-config.cjs";
import routeConfig from "./src/config/route-config.js";
// import errorConfig from "./src/config/error-config";

// *** express instance *** //
const app = express();

// *** config *** //
appConfig(app);
routeConfig(app);
// errorConfig(app);

// Listen to specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  const { address, port } = server.address();
  console.log(
    "AWS Practice Project API listening at http://%s:%s",
    address,
    port
  );
});

export default server;
