// *** main dependencies *** //
const express = require("express");
// import cookieParser from "cookie-parser";
// import cors from "cors";
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const path = require("path");

// import { Settings } from "../utils/settings";

// *** view folders *** //
const viewFolders = [path.join(__dirname, "../..", "views")];

function init(app) {
  // validate environment variables
  // const settings = Settings.getInstance();

  // *** view engine *** //
  nunjucks.configure(viewFolders, {
    express: app,
    autoescape: true,
  });
  app.set("view engine", "html");

  // *** app middleware *** //
  // if (settings.env === "development") {
  if (app.get("env") === "development") {
    app.use(morgan("dev"));
  }

  // app.use(
  //   cors <
  //     express.Request >
  //     {
  //       allowedHeaders: ["Origin, X-Requested-With, Content-Type, Accept"],
  //       credentials: true,
  //       origin: true,
  //     }
  // );

  if (app.get("env") === "production") {
    app.set("trust proxy", 1); // trust first proxy
  }

  // app.use(cookieParser(settings.cookieSecret));

  app.use(express.json({ limit: "50mb" }));
  app.use(
    express.urlencoded({
      limit: "50mb",
      extended: true,
    })
  );

  app.use(express.static(path.join(__dirname, "..", "..", "client")));
}

module.exports = init;
