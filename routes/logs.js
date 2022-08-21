const express = require("express");
const router = express.Router();
const moment = require("moment");
const { addNewLog, updateLogTime, timeFormat } = require("../helpers/sheets");

router.post("/", async (req, res) => {
  const {
    ticket_id: ticketId,
    nif,
    name,
    phone,
    location,
    severity_lvl: severityLvl,
    severity_name: severityName,
  } = req.body;
  const data = [
    ticketId,
    nif,
    name,
    phone,
    location,
    severityLvl,
    severityName,
    moment(new Date()).format(timeFormat),
  ];
  await addNewLog([data]);
  res.send(`ticket ${ticketId} has successfully been created!`);
});

router.put("/", async (req, res) => {
  const { ticket_id: ticketId } = req.body;
  await updateLogTime(ticketId);
  res.send(`ticket ${ticketId} has successfully been updated and finished!`);
  return;
});

module.exports = router;
/*



*/
