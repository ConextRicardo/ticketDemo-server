require("dotenv").config();
const fs = require("fs");
const { google } = require("googleapis");

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUris = [process.env.REDIRECT_URIS];
const code = process.env.CODE;

const oAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUris[0]
);

const getToken = async () => {
  const { tokens } = await oAuth2Client.getToken(code);
  console.info(tokens);
  fs.writeFileSync("google-oauth-token.json", JSON.stringify(tokens));
};

getToken();
