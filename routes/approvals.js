const express = require("express");
const router = express.Router();
const { updateNocApproval, updateOpApproval } = require("../helpers/sheets");

router.get("/", async (req, res) => {
  res.send("approvals");
});

router.put("/op", async (req, res) => {
  const { ticket_id: ticketID } = req.body;
  await updateOpApproval(ticketID);
  res.send({
    code: 200,
    message: `operations has successfully approved ticket ${ticketID}`,
  });
});

router.put("/noc", async (req, res) => {
  const { ticket_id: ticketID } = req.body;
  await updateNocApproval(ticketID);
  res.send({
    code: 200,
    message: `NOC has successfully approved ticket ${ticketID}`,
  });
});

module.exports = router;
