// server.js
// where your node app starts

// init project
var express = require("express")
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors")
app.use(cors({ optionSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/views/index.html")
})

// your first API endpoint...
app.get("/api/hello", function (req, res) {
	res.json({ greeting: "hello API" })
})

app.get("/api/timestamp/:date_string?", function (req, res) {
	const dateString = req.params.date_string
	const unix = Number(dateString)

	if (dateString == undefined) {
		return res.json({
			unix: new Date().getTime(),
			utc: new Date().toUTCString(),
		})
	}

	if (unix) {
		const date = new Date(unix).toUTCString()
		if (!date) return res.json({ error: "Invalid Date" })

		res.json({
			unix,
			utc: new Date(unix).toUTCString(),
		})
	} else {
		const date = new Date(dateString).getTime()
		if (!date) return res.json({ error: "Invalid Date" })

		res.json({ unix: date, utc: new Date(dateString).toUTCString() })
	}
})

//listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
// 	console.log("Your app is listening on port " + listener.address().port)
// })

app.listen(3000, () => {
	console.log("server on port " + 3000)
})
