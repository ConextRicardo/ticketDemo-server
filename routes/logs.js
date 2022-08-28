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
  try {
    const ticketData = await readLogs();
    const ticketId = ticketData.length;
    const {
      NIF,
      NOMBRE,
      TELEFONO,
      DIRECCION,
      OLT,
      PUERTO_OLT,
      NOMENCLATURA,
      EQUIPO,
      MAC,
      SERIAL,
      PROVEEDOR,
      NIVEL_SEVERIDAD,
      NOMBRE_SEVERIDAD,
    } = req.body;
    const data = [
      ticketId,
      NIF,
      NOMBRE,
      TELEFONO,
      DIRECCION,
      NIVEL_SEVERIDAD,
      NOMBRE_SEVERIDAD,
      "",
      "",
      OLT,
      PUERTO_OLT,
      NOMENCLATURA,
      EQUIPO,
      MAC,
      SERIAL,
      PROVEEDOR,
      moment(new Date()).format(timeFormat),
    ];
    await addNewLog([data]);
    res.send(`el ticket ${ticketId} se ha creado!`);
  } catch (err) {
    res.status(500).send(`Hubo un error! :( , Intenta de nuevo!`);
  }
});

router.put("/", async (req, res) => {
  const { ticket_id: ticketId } = req.body;
  await updateLogTime(ticketId);
  res.send(`el ticket ${ticketId} ha finalizado!`);
  return;
});

module.exports = router;
