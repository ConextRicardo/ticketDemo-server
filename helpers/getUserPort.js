const getUserPort = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "1ljk9qXBX22HxZDb5pGY4hSP2ul9rM6poYs2pLvEWEjI";

  const getOpData = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "DATA",
  });
  const getListaCorteData = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "CORTE",
  });
  const filteredListCorte = [];
  const filteredListOp = [];

  const opData = getOpData.data.values;
  const listaCorteData = getListaCorteData.data.values;
  opData.map((item) => filteredListOp.push([item[3], item[25], item[26]]));
  listaCorteData.map((item) => filteredListCorte.push(item[0]));

  const resultedArr = filteredListOp.filter((item) => {
    return filteredListCorte.includes(item[0]);
  });

  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "RESULTADO!A:C",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: resultedArr,
    },
  });
};
