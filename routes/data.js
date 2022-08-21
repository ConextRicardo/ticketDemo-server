const express = require("express");
const router = express.Router();
const { readDB, readLogs, VALUES } = require("../helpers/sheets");

router.post("/", async (req, res) => {
  const { value, type } = req.body;
  const searchType = VALUES[type];
  const result = await readDB(value, searchType);
  const data = {
    NIF: result[2],
    Nombre: result[3],
    Telf_Contacto: result[4],
    Ubicacion: `${result[5]} ${result[6]} ${result[7]}`,
    OLT: result[8],
    Puerto_OLT: result[8],
    NOMENCLATURA: result[10],
    EQUIPO: result[11],
    MAC_ONT: result[12],
    SN_ONT: result[13],
    Proveedor: result[14],
  };
  res.send(data);
});

router.get("/", async (req, res) => {
  const all = await readLogs();
  all.shift();
  const pending = [];
  const history = [];
  all.map((log) => {
    log.length <= 17 ? pending.push(log) : history.push(log);
  });
  res.send({ pendientes: pending, historial: history, totales: all });
});

module.exports = router;
