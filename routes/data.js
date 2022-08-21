const express = require("express");
const router = express.Router();
const { readDB, VALUES } = require("../helpers/sheets");

router.post("/", async (req, res) => {
  const enteredValue = req.body.value;
  const valueType = req.body.type;
  const searchType = VALUES[valueType];
  const result = await readDB(enteredValue, searchType);
  res.send(result);
});

module.exports = router;
