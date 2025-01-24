// index.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.param("date", (request, response, next, parameter) => {
  try {
    if (parameter && parameter.length === 13) {
      request.date = new Date(parseInt(parameter));
    } else if (parameter === "") {
      request.date = new Date();
    } else {
      request.date = new Date(parameter);
    }
  } catch {
    response.json({ error: "Invalid date" }).end();
  }
});

// your first API endpoint...
app.get("/api/:date", function (req, res) {
  res.json({ unix: req.date.getTime(), utc: req.date.toUTCString() });
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
