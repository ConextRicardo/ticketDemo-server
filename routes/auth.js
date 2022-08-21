const express = require("express");
const router = express.Router();
const moment = require("moment");

router.get("/", async (req, res) => {
  res.send("auth");
});

module.exports = router;
