const express = require("express");
const router = express.Router();

const error = {
  code: 406,
  message:
    "The Combination of Email & Password Does Not Exist, Please Try Again.",
};

const users = {
  "noc@conext.com.ve": process.env.NOC_PASSWORD,
  "nelitza.alvarez@conext.com.ve": process.env.OP_PASSWORD,
  "soporte@conext.com.ve": process.env.SUPPORT_PASSWORD,
};

const authCheck = (email, password) => {
  const userPassword = users[email] !== undefined ? users[email] : error;
  const check = userPassword === password;
  const condNoc = email === "noc@conext.com.ve" && check;
  const condOp = email === "nelitza.alvarez@conext.com.ve" && check;
  const condSupport = email === "soporte@conext.com.ve" && check;
  return condNoc
    ? { user: "NOC" }
    : condOp
    ? { user: "OP" }
    : condSupport
    ? { user: "ST" }
    : error;
};

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const result = authCheck(email.toLowerCase(), password);
  res.send(result);
});

module.exports = router;
