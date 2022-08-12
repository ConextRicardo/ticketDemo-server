const sheetClient = require("../api/client");
const { google } = require("googleapis");
require("dotenv").config();

const readSS = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const client = await auth.getClient();
  const sheet = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = process.env.SHEET_ID;
  const range = "DATA";
  const result = sheet.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range,
  });
  return result;
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

module.exports = { readSS, appendSS, updateSS, createSS };
