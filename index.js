require("dotenv").config();
const app = require("./app");

app.listen(process.env.PORT || 5000, () => {
  console.log(`server running @ http://localhost:${process.env.PORT || 5000}`);
});
