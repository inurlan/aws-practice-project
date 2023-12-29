import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/_ah/start", (req, res, next) => {
  res.status(200).json();
});

router.get("/_ah/stop", (req, res, next) => {
  res.status(200).json();
});

router.get("/*", (req, res, next) => {
  res.setHeader("Last-Modified", new Date().toUTCString());
  next();
});

export default router;
