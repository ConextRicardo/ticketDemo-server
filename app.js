require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const data = require("./routes/data");
const logs = require("./routes/logs");
const auth = require("./routes/auth");
const approvals = require("./routes/approvals");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/data", data);
app.use("/logs", logs);
app.use("/auth", auth);
app.use("/approvals", approvals);

module.exports = app;
