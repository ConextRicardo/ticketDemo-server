const { google } = require("googleapis");
require("dotenv").config();

const VALUES = {
  NRO: 0,
  Fecha: 1,
  "CI-RIF": 2,
  Nombre: 3,
  Telf_Contacto: 4,
  Ubicacion: 5,
  "Nro_Casa-Apto": 6,
  Apto: 7,
  OLT: 8,
  Puerto_OLT: 9,
  NOMENCLATURA: 10,
  EQUIPO: 11,
  MAC_ONT: 12,
  "SN ONT": 13,
  Proveedor: 14,
};

const readSS = async (value, index) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "secrets.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const client = await auth.getClient();
  const sheet = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = process.env.SHEET_ID;
  const range = "TICKET!A:O";
  const result = await sheet.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range,
  });
  const data = await result.data.values;
  const query = data.find((client) => client[index] === value);
  return query;
};

const appendSS = async (spreadsheetId, range, values) => {
  // await googleSheets.spreadsheets.values.append({
  //   auth,
  //   spreadsheetId,
  //   range: "RESULTADO!A:C",
  //   valueInputOption: "USER_ENTERED",
  //   resource: {
  //     values: resultedArr,
  //   },
  // });
};

const updateSS = async (spreadsheetId, range, values) => {
  // const sheets = google.sheets({ version: "v4", auth: this.oAuth2Client });
  // return sheets.spreadsheets.values.update({
  //   spreadsheetId,
  //   range,
  //   valueInputOption: "USER_ENTERED",
  //   resource: { values },
  // });
};

const createSS = async (title) => {
  // const sheets = google.sheets({ version: "v4", auth: this.oAuth2Client });
  // return sheets.spreadsheets.create({
  //   resource: {
  //     properties: { title },
  //   },
  // });
};

module.exports = { readSS, appendSS, updateSS, createSS, VALUES };
