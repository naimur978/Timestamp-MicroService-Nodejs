// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

const port = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/timestamp/:date_string?", function(req, res) {
  //parse date_string from api endpoint
  const dateString = req.params.date_string;

  // if no data resides in dateString
  if (!dateString) {
    return res.json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString()
    });
  }


  // convert the date as number
  // Number object : https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_number
  const unix = Number(dateString);

  if (unix) {
    const date = new Date(unix).toUTCString();
    if (!date) return res.json({ error: "Invalid Date" });

    res.json({
      unix: unix,
      utc: new Date(unix).toUTCString()
    });
  } else {
    const date = new Date(dateString).getTime();
    if (!date) return res.json({ error: "Invalid Date" });

    res.json({
      unix: date,
      utc: new Date(dateString).toUTCString()
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
