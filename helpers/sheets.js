const { google } = require("googleapis");
const moment = require("moment");
require("dotenv").config();

const VALUES = {
  NRO: 0,
  Fecha: 1,
  NIF: 2,
  Nombre: 3,
  Telf_Contacto: 4,
  UBIC1: 5,
  UBIC2: 6,
  UBIC3: 7,
  OLT: 8,
  Puerto_OLT: 9,
  NOMENCLATURA: 10,
  EQUIPO: 11,
  MAC_ONT: 12,
  SN_ONT: 13,
  Proveedor: 14,
};
const auth = new google.auth.GoogleAuth({
  keyFile: "secrets.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});
const client = async () => {
  const logClient = await auth.getClient();
  return logClient;
};
const timeFormat = "DD-MM-YYYY hh:mm:ss A";

const readDB = async (value, index) => {
  const spreadsheetId = process.env.SHEET_DATA_ID;
  const range = "TICKET!A:O";
  const sheet = google.sheets({ version: "v4", auth: client });
  const result = await sheet.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range,
  });
  const data = await result.data.values;
  const query = data.find((client) => client[index] === value);
  return query;
};
const readLogs = async () => {
  const spreadsheetId = process.env.SHEET_LOGS_ID;
  const range = "LOGS!A:S";
  const sheet = google.sheets({ version: "v4", auth: client });
  const result = await sheet.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range,
  });
  return await result.data.values;
};
const addNewLog = async (values) => {
  const spreadsheetId = process.env.SHEET_LOGS_ID;
  const range = "LOGS!A:Q";
  const sheet = google.sheets({ version: "v4", auth: client });
  await sheet.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    resource: {
      values,
    },
  });
};
const updateLogTime = async (ticketId) => {
  const spreadsheetId = process.env.SHEET_LOGS_ID;
  const range = "LOGS!A:S";
  const sheet = google.sheets({ version: "v4", auth: client });
  const result = await sheet.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range,
  });
  const data = await result.data.values;
  const resultedData = data.find((item, index) => {
    if (item[0] === ticketId) {
      return index;
    }
  });
  const dataIndex = data.indexOf(resultedData);
  const startTime = resultedData[16];
  const endTime = moment(new Date()).format(timeFormat);
  const totalTime = moment(endTime, timeFormat).diff(
    moment(startTime, timeFormat)
  );
  const finalTime = moment.duration(totalTime);
  await sheet.spreadsheets.values.update({
    auth,
    spreadsheetId,
    range: `LOGS!Q${dataIndex + 1}:S`,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [
        [
          `${startTime}`,
          `${endTime}`,
          `${finalTime.hours()} horas y ${finalTime.minutes()} minutos`,
        ],
      ],
    },
  });
};
const updateNocApproval = async (ticketId, approval) => {
  const spreadsheetId = process.env.SHEET_LOGS_ID;
  const range = "LOGS!A:S";
  const sheet = google.sheets({ version: "v4", auth: client });
  const result = await sheet.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range,
  });
  const data = await result.data.values;
  const resultedData = data.find((item, index) => {
    if (item[0] === ticketId) {
      return index;
    }
  });
  const dataIndex = data.indexOf(resultedData);
  await sheet.spreadsheets.values.update({
    auth,
    spreadsheetId,
    range: `LOGS!I${dataIndex + 1}:I`,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[`${approval}`]],
    },
  });
};
const updateOpApproval = async (ticketId, approval) => {
  const spreadsheetId = process.env.SHEET_LOGS_ID;
  const range = "LOGS!A:S";
  const sheet = google.sheets({ version: "v4", auth: client });
  const result = await sheet.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range,
  });
  const data = await result.data.values;
  const resultedData = data.find((item, index) => {
    if (item[0] === ticketId) {
      return index;
    }
  });
  const dataIndex = data.indexOf(resultedData);
  await sheet.spreadsheets.values.update({
    auth,
    spreadsheetId,
    range: `LOGS!H${dataIndex + 1}:H`,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[`${approval}`]],
    },
  });
};

module.exports = {
  readDB,
  readLogs,
  addNewLog,
  updateLogTime,
  updateNocApproval,
  updateOpApproval,
  VALUES,
  timeFormat,
};
