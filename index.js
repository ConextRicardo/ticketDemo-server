require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { readSS, VALUES } = require("./helpers/sheets");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/", async (req, res) => {
  const enteredValue = req.body.value;
  const valueType = req.body.type;
  const searchType = VALUES[valueType];
  const result = await readSS(enteredValue, searchType);
  res.send(result);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`server running @ http://localhost:${process.env.PORT || 5000}`);
});
