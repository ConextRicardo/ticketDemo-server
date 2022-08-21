const express = require("express");
const router = express.Router();
const moment = require("moment");
const {
  addNewLog,
  updateLogTime,
  timeFormat,
  readLogs,
} = require("../helpers/sheets");

router.post("/", async (req, res) => {
  const ticketData = await readLogs();
  const ticketId = ticketData.length;
  const {
    nif,
    name,
    phone,
    location,
    olt,
    puerto_olt,
    nomenclature,
    device,
    mac_address,
    sn,
    provider,
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
    "",
    "",
    olt,
    puerto_olt,
    nomenclature,
    device,
    mac_address,
    sn,
    provider,
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
