const { google } = require("googleapis");
require("dotenv").config();

const sheetClient = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const client = await auth.getClient();
  const sheet = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = process.env.SHEET_ID;
  const range = "DATA";

  return { sheet, spreadsheetId, auth, range };
};

module.exports = sheetClient;
