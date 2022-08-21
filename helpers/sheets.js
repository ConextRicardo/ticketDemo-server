const { google } = require("googleapis");
const moment = require("moment");
require("dotenv").config();

const VALUES = {
  "CI-RIF": 2,
  Nombre: 3,
  Telf_Contacto: 4,
  MAC_ONT: 12,
  "SN ONT": 13,
};
const auth = new google.auth.GoogleAuth({
  keyFile: "secrets.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});
const client = async () => {
  const logClient = await auth.getClient();
  return logClient;
};
const timeFormat = "DD-MM-YY hh:mm:ss A";

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
  const range = "LOGS!A:J";
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
  const range = "LOGS!A:H";
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
  const range = "LOGS!A:J";
  const sheet = google.sheets({ version: "v4", auth: client });
  const test = await sheet.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range,
  });
  const data = await test.data.values;
  const resultedData = data.find((item, index) => {
    if (item[0] === ticketId) {
      return index;
    }
  });
  const dataIndex = data.indexOf(resultedData);
  const startTime = resultedData[7];
  const endTime = moment(new Date()).format(timeFormat);
  console.log(startTime, endTime);
  const totalTime = moment(endTime, timeFormat).diff(
    moment(startTime, timeFormat)
  );
  await sheet.spreadsheets.values.update({
    auth,
    spreadsheetId,
    range: `LOGS!H${dataIndex + 1}:J`,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[`${startTime}`, `${endTime}`, `${totalTime}`]],
    },
  });
};
const updateNocApproval = async (ticketId, approval) => {
  const spreadsheetId = process.env.SHEET_LOGS_ID;
  const range = "LOGS!A:J";
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
    range: `LOGS!L${dataIndex + 1}:L`,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[`${approval}`]],
    },
  });
};
const updateOpApproval = async (ticketId, approval) => {
  const spreadsheetId = process.env.SHEET_LOGS_ID;
  const range = "LOGS!A:J";
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
    range: `LOGS!K${dataIndex + 1}:K`,
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
