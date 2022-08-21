const express = require("express");
const router = express.Router();
const { updateNocApproval, updateOpApproval } = require("../helpers/sheets");

router.get("/", async (req, res) => {
  res.send("approvals");
});

router.post("/op", async (req, res) => {
  const { approval, ticket_id: ticketID } = req.body;
  await updateOpApproval(ticketID, approval);
  res.send("op");
});

router.post("/noc", async (req, res) => {
  const { approval, ticket_id: ticketID } = req.body;
  await updateNocApproval(ticketID, approval);
  res.send("noc");
});

module.exports = router;
