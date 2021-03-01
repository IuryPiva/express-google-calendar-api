const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");

const { client_id, client_secret, redirect_uris } = process.env;

const express = require("express");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get("/status", async (req, res) => {
  res.status(200).send('tá funcionando eim');
});

app.post("/create-calendar", async (req, res) => {
  try {
    const oAuth2Client = new OAuth2(client_id, client_secret, redirect_uris[0]);

    oAuth2Client.setCredentials({ refresh_token });

    const result = await calendar.calendars.insert({
      requestBody: {
        summary: req.body.summary,
        description: req.body.message,
        timeZone: "America/Sao_Paulo",
      },
      auth: oAuth2Client,
    });

    res.status(200).send(result);
  } catch (e) {
    console.log({ e });
    res.status(500).send({ e });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
