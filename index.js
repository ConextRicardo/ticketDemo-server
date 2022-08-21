require("dotenv").config();
const app = require("./app");
const { readLogs } = require("./helpers/sheets");
const moment = require("moment");

app.get("/", async (req, res) => {
  res.send("app running");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`server running @ http://localhost:${process.env.PORT || 5000}`);
});
