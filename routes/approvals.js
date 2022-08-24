const express = require("express");
const router = express.Router();
const { updateNocApproval, updateOpApproval } = require("../helpers/sheets");

router.get("/", async (req, res) => {
  res.send("approvals");
});

router.post("/op", async (req, res) => {
  const { approval, ticket_id: ticketID } = req.body;
  await updateOpApproval(ticketID, approval);
  res.send({
    code: 200,
    message: `operations has successfully approved ticket ${ticketID}`,
  });
});

router.post("/noc", async (req, res) => {
  const { approval, ticket_id: ticketID } = req.body;
  await updateNocApproval(ticketID, approval);
  res.send({
    code: 200,
    message: `NOC has successfully approved ticket ${ticketID}`,
  });
});

module.exports = router;
