const { google } = require("googleapis");
const moment = require("moment");
require("dotenv").config();

const VALUES = {
  NRO: 0,
  FECHA: 1,
  NIF: 2,
  NOMBRE: 3,
  TELF: 4,
  UBIC: 5,
  "RES-EDIF-CC": 6,
  "APTO-LOC-CASA": 7,
  OLT: 8,
  FRAME: 9,
  SLOT: 10,
  PORT: 11,
  ONU_ID: 12,
  NOMENCLATURA: 13,
  EQUIPO: 14,
  MAC: 15,
  SN: 16,
  Proveedor: 17,
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
  const range = "TICKET!A:R";
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
  return result.data.values;
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
const updateNocApproval = async (ticketId) => {
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
      values: [[`si`]],
    },
  });
};
const updateOpApproval = async (ticketId) => {
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
      values: [[`si`]],
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
