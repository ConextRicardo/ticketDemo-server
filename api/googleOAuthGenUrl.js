require("dotenv").config();
const { google } = require("googleapis");

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUris = [process.env.REDIRECT_URIS];

const oAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUris[0]
);

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

const url = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
});

console.info(`authUrl: ${url}`);
