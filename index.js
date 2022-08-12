require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { readSS } = require("./helpers/sheets");
const sheetClient = require("./api/client");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const test = await readSS();
  // const test = await sheetClient();
  console.log(test);
  res.send("getData");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`server running @ http://localhost:${process.env.PORT || 5000}`);
});
