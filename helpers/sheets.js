require("dotenv").config();
const _ = require("lodash");
const fs = require("fs");
const { google } = require("googleapis");

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUris = [process.env.REDIRECT_URIS];

const oAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUris[0]
);

const token = {
  access_token: process.env.ACCESS_TOKEN,
  token_type: process.env.TOKEN_TYPE,
  refresh_token: process.env.REFRESH_TOKEN,
  expiry_date: process.env.EXPIRY_DATE,
};
oAuth2Client.setCredentials(token);

const readSS = async (spreadsheetId, range) => {
  const sheets = google.sheets({ version: "v4", auth: oAuth2Client });

  return sheets.spreadsheets.values
    .get({
      spreadsheetId,
      range,
    })
    .then(_.property("data.values"));
};

const appendSS = async (spreadsheetId, range, values) => {
  const sheets = google.sheets({ version: "v4", auth: this.oAuth2Client });

  return sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    resource: { values },
  });
};

const updateSS = async (spreadsheetId, range, values) => {
  const sheets = google.sheets({ version: "v4", auth: this.oAuth2Client });

  return sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    resource: { values },
  });
};

const createSS = async (title) => {
  const sheets = google.sheets({ version: "v4", auth: this.oAuth2Client });

  return sheets.spreadsheets.create({
    resource: {
      properties: { title },
    },
  });
};

module.exports = { readSS, appendSS, updateSS, createSS };
