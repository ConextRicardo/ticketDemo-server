require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const data = require("./routes/data");
const logs = require("./routes/logs");
const auth = require("./routes/auth");
const { readLogs } = require("./helpers/sheets");
const moment = require("moment");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/data", data);
app.use("/logs", logs);
app.use("/auth", auth);

app.get("/", async (req, res) => {
  const all = await readLogs();
  all.shift();
  const pending = [];
  const history = [];
  all.map((log) => {
    log.length <= 8 ? pending.push(log) : history.push(log);
  });
  res.send({ pendientes: pending, historial: history, todos: all });
});
// app.get("/", (req, res) => {
//   const tA = moment("19-08-22 09:08:47 AM", "DD-MM-YY hh:mm:ss A");
//   const tB = moment("19-08-22 09:09:47 AM", "DD-MM-YY hh:mm:ss A");
//   const dT = tB.diff(tA);
//   const tempTime = moment.duration(dT);
//   const y = `${tempTime.hours()} : ${tempTime.minutes()}`;
//   console.log(y);
//   res.send(`${tB.diff(tA)}`);
// });

app.listen(process.env.PORT || 5000, () => {
  console.log(`server running @ http://localhost:${process.env.PORT || 5000}`);
});
