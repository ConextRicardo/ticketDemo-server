require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const { readSS } = require("./helpers/sheets");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send("Hi Mom!");
// });

app.get("/", async (req, res) => {
  const result = await readSS(
    "11RP48bv06DwS_Fd3G0TwpO-b3saLEiP_AnaSBRWVmZQ",
    "Hoja 1!A:B"
  );
  console.log(result);
  res.send(JSON.stringify(result));
});

app.listen(PORT, () => {
  console.log(`server running @ http://localhost:${PORT}`);
});
