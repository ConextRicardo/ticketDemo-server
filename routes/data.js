const express = require("express");
const router = express.Router();
const { readDB, readLogs, VALUES } = require("../helpers/sheets");

router.post("/", async (req, res) => {
  const { value, type } = req.body;
  const searchType = VALUES[type];
  const result = await readDB(value, searchType);
  const data = {
    NIF: result[2],
    NOMBRE: result[3],
    TELEFONO: result[4],
    DIRECCION: `${result[5]} ${result[6]} ${result[7]}`,
    OLT: `OLTx${result[8]}`,
    PUERTO_OLT: `${result[9]}/${result[10]}/${result[11]}/${result[12]}`,
    NOMENCLATURA: result[13],
    EQUIPO: result[14],
    MAC: result[15],
    SERIAL: result[16],
    PROVEEDOR: result[17],
  };
  res.send(data);
});

router.get("/", async (req, res) => {
  const all = await readLogs();
  all.shift();
  const pending = [];
  const history = [];
  all.map((log) => {
    log.length <= 17
      ? pending.push({
          TICKET: log[0],
          NIF: log[1],
          NOMBRE: log[2],
          TELF: log[3],
          DIRECCION: log[4],
          NIVEL_SEVERIDAD: log[5],
          NOMBRE_SEVERIDAD: log[6],
          OP_APROBACION: log[7],
          NOC_APROBACION: log[8],
          OLT: log[9],
          PUERTO_OLT: log[10],
          NOMENCLATURA: log[11],
          EQUIPO: log[12],
          MAC: log[13],
          SERIAL: log[14],
          PROVEEDOR: log[15],
          INICIO: log[16],
        })
      : history.push({
          TICKET: log[0],
          NIF: log[1],
          NOMBRE: log[2],
          TELF: log[3],
          DIRECCION: log[4],
          NIVEL_SEVERIDAD: log[5],
          NOMBRE_SEVERIDAD: log[6],
          OP_APROBACION: log[7],
          NOC_APROBACION: log[8],
          OLT: log[9],
          PUERTO_OLT: log[10],
          NOMENCLATURA: log[11],
          EQUIPO: log[12],
          MAC: log[13],
          SERIAL: log[14],
          PROVEEDOR: log[15],
          INICIO: log[16],
          FIN: log[17],
          TIEMPO: log[18],
        });
  });
  res.send({ pendientes: pending, historial: history, totales: all });
});

module.exports = router;
